from django.db import models

# Create your models here.
class School(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    contact_firstname = models.CharField(max_length=255)
    contact_lastname = models.CharField(max_length=255)


class Sale(models.Model):
    SALE_STATE = (
        ('FIRST_CONTACT', 'FIRST_CONTACT'),
        ('PROPOSAL', 'PROPOSAL'),
        ('REVIVAL', 'REVIVAL'),
        ('NEGOTIATION', 'NEGOTIATION'),
        ('REFUSAL', 'REFUSAL'),
        ('ABANDONMENT', 'ABANDONMENT'),
        ('WON', 'WON')
    )
    SALE_SOURCE = (
        ('CANVASSING', 'CANVASSING'),
        ('INCOMING_CALL', 'INCOMING_CALL'),
        ('WORD_OF_MOUTH', 'WORD_OF_MOUTH'),
        ('NETWORK', 'NETWORK'),
        ('LOUNGE', 'LOUNGE')
    )

    SALE_ACTION_STATE = (
        ('TODO', 'TODO'),
        ('IN_PROGRESS', 'IN_PROGRESS'),
        ('ON_BREAK', 'ON_BREAK'),
        ('FINISH', 'FINISH'),
        ('STOP', 'STOP')

    )
    id = models.AutoField(primary_key=True)
    dt_created = models.DateTimeField(default=None, blank=True, null=True)
    dt_update = models.DateTimeField(default=None, blank=True, null=True)
    amount_signed = models.FloatField(default=None, blank=True, null=True)
    dt_next_action = models.DateTimeField(default=None, blank=True, null=True)
    comment = models.CharField(max_length=255)
    sale_state = models.CharField(max_length=35, choices=SALE_STATE, default=None, blank=True, null=True)
    sale_source = models.CharField(max_length=35, choices=SALE_SOURCE, default=None, blank=True, null=True)
    sale_action_state = models.CharField(max_length=35, choices=SALE_ACTION_STATE, default=None, blank=True, null=True)
    school = models.ForeignKey(School,null=True,on_delete=models.CASCADE,related_name='sales') 


