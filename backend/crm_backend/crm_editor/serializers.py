from rest_framework import serializers
from crm_editor.models import Sale, School

class SchoolSerializer(serializers.ModelSerializer):
    # name = serializers.CharField(max_length=255)
    # contact_firstname = serializers.CharField(max_length=255)
    # contact_lastname = serializers.CharField(max_length=255)

    class Meta:
        model = School
        fields = '__all__'

    def create(self, validated_data):
        return School.objects.create(**validated_data)

class SaleSerializer(serializers.ModelSerializer):
    # dt_created = serializers.DateTimeField()
    # dt_update = serializers.DateTimeField()
    # amount_signed = serializers.FloatField()
    # dt_next_action = serializers.DateTimeField()
    # comment = serializers.CharField(max_length=255)
    # sale_state = serializers.ChoiceField(choices=['FIRST_CONTACT', 'PROPOSAL', 'REVIVAL', 'NEGOTIATION', 'REFUSAL', 'ABANDONMENT', 'WON'])
    # sale_source = serializers.ChoiceField(choices=['CANVASSING', 'INCOMING_CALL', 'WORD_OF_MOUTH', 'NETWORK', 'LOUNGE'])
    # sale_action_state = serializers.ChoiceField(choices=['TODO', 'IN_PROGRESS', 'ON_BREAK', 'FINISH', 'STOP'])
    # school = SchoolSerializer
    
    class Meta:
        model = Sale
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        return Sale.objects.create(**validated_data)
        
    def update(self, instance, validated_data):
        instance.amount_signed = validated_data.get('amount_signed', instance.amount_signed)
        instance.dt_next_action = validated_data.get('dt_next_action', instance.dt_next_action)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.sale_state = validated_data.get('sale_state', instance.sale_state)
        instance.sale_source = validated_data.get('sale_source', instance.sale_source)
        instance.sale_action_state = validated_data.get('sale_action_state', instance.sale_action_state)
        instance.school = validated_data.get('school', instance.school)

        instance.save()
        return instance