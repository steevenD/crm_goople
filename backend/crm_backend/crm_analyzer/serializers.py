from rest_framework import serializers
from .models import Objectif

class ObjectifSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Objectif
        fields = '__all__'

    def create(self, validated_data):
        return Objectif.objects.create(**validated_data)