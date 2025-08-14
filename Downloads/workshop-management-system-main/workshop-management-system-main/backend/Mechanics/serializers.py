from rest_framework import serializers
from .models import Mechanic

class MechanicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Mechanic
        fields = '__all__'
