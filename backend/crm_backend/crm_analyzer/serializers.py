from rest_framework import serializers
from crm_analyzer.models import Objectif

class ObjectifSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Ojectif
        fields = '__all__'

    def create(self, validated_data):
        return Ojectif.objects.create(**validated_data)