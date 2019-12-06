from django.db import models

# Create your models here.
class Objectif(models.Model):
    
    GOAL_LABEL = (
        ('SIGNED_SALES', 'SIGNED_SALES'),
        ('NB_CONTACT', 'NB_CONTACT'),
        ('EARNED_SALES', 'EARNED_SALES'),
        ('RENOUNCED_SALES', 'RENOUNCED_SALES')
    )
    id = models.AutoField(primary_key=True)
    goal_label = models.CharField(max_length=35, choices=GOAL_LABEL,default=None, blank=True, null=True)
    number_objectif = models.FloatField(default=0, blank=True, null=True)
   