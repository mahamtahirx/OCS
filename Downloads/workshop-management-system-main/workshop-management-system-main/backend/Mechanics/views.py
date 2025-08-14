from rest_framework import viewsets
from .models import Mechanic
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import MechanicSerializer

class MechanicViewSet(viewsets.ModelViewSet):
    queryset = Mechanic.objects.all().order_by('-join_date')
    serializer_class = MechanicSerializer
    parser_classes = [MultiPartParser, FormParser]