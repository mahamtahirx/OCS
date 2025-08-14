from rest_framework import serializers
from .models import SparePart, IssueSparePart

class SparePartSerializer(serializers.ModelSerializer):
    price = serializers.FloatField()  # forces numeric type in JSON
    
    class Meta:
        model = SparePart
        fields = '__all__'

class IssueSparePartHistorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='spare_part.name')
    part_number = serializers.CharField(source='spare_part.part_number')
    image = serializers.ImageField(source='spare_part.picture')
    ba_no = serializers.CharField(source='vehicle.bano')
    reg_no = serializers.CharField(source='vehicle.civil_reg_no')

    class Meta:
        model = IssueSparePart
        fields = ['name', 'part_number', 'image', 'quantity_used', 'ba_no', 'reg_no', 'issued_at']

