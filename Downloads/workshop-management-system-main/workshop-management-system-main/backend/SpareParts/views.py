import json
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import SparePart, IssueSparePart
from .serializers import SparePartSerializer, IssueSparePartHistorySerializer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.http import JsonResponse
from django.db import models
from django.shortcuts import get_object_or_404
from Vehicles.models import Vehicle


class SparePartViewSet(viewsets.ModelViewSet):
    queryset = SparePart.objects.all().order_by('-date')
    serializer_class = SparePartSerializer
    parser_classes = [MultiPartParser, FormParser]
    
    def perform_create(self, serializer):
        instance = serializer.save()
        check_low_stock_and_notify()

    def perform_update(self, serializer):
        instance = serializer.save()
        check_low_stock_and_notify()
    

def check_low_stock_and_notify():
    low_parts = SparePart.objects.filter(quantity__lt=models.F('reorder_level'))

    channel_layer = get_channel_layer()

    # Send full low stock list to replace frontend notifications
    notifications = []
    for part in low_parts:
        status = "Out of stock" if part.quantity == 0 else "Low In stock"
        message = f"{part.name} (Part #{part.part_number}) is {status}."
        
        notifications.append({
            "id": part.id,
            "message": message,
        })

    async_to_sync(channel_layer.group_send)(
        "notifications",
        {
            "type": "send_notification",
            "notifications": notifications,  # full replacement list
        }
    )
    
    
class SparePartsForm(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body)
            if isinstance(data, list):
                for item in data:
                    # Ensure each item in the list is a dictionary
                    item_data = {
                        "bano": item.get("bano"),
                        "make_type": item.get("make_type"),
                        "model": item.get("model"),
                        "model_year": item.get("model_year"),
                        "unit": item.get("unit"),
                        "registration": item.get("registration"),
                        "type": item.get("type"),
                        "date": item.get("date"),
                    }

                    print(item_data)
                return JsonResponse([item_data], safe=False, status=201)
            else:
                return JsonResponse({"error": "Expected a list of items"}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        
        
class AvailableSpareParts(APIView):
    def get(self, request):
        parts = SparePart.objects.filter(quantity__gt=0)
        serializer = SparePartSerializer(parts, many=True)
        return Response(serializer.data)
    
    
class IssueSparePartsView(APIView):
    def post(self, request):
        ba_no = request.data.get('ba_no')
        parts = request.data.get('parts', [])
        date = request.data.get('date')  # optional use

        vehicle = get_object_or_404(Vehicle, bano=ba_no)

        issued_records = []

        for item in parts:
            part_id = item.get('part_id')
            qty = int(item.get('quantity'))

            spare_part = get_object_or_404(SparePart, id=part_id)

            if qty > spare_part.quantity:
                return Response(
                    {"error": f"Not enough quantity for {spare_part.name}"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Deduct quantity
            spare_part.quantity -= qty
            spare_part.save()

            # Save issued record
            issued = IssueSparePart.objects.create(
                vehicle=vehicle,
                spare_part=spare_part,
                quantity_used=qty
            )
            issued_records.append({
                "name": spare_part.name,
                "part_number": spare_part.part_number,
                "quantity": qty,
                "image": spare_part.picture.url if spare_part.picture else None,
                "ba_no": vehicle.bano,
                "reg_no": vehicle.civil_reg_no,
                "date": issued.issued_at.strftime("%Y-%m-%d %H:%M"),
            })

        return Response({
            "message": "Spare parts issued successfully!",
            "history": issued_records  # 👈 You can use this directly in frontend if needed
        })
       
        
class IssueHistoryView(APIView):
    def get(self, request):
        issued = IssueSparePart.objects.select_related('spare_part', 'vehicle').order_by('-issued_at')
        serializer = IssueSparePartHistorySerializer(issued, many=True)
        return Response(serializer.data)
