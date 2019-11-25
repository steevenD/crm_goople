from django.db import models

# Create your models here.
class Objectif(models.Model):
    id = models.AutoField(primary_key=True)
    objectif = models.CharField(max_length=8, default=None, blank=True, null=True)
    number_objectif = models.FloatField(default=None, blank=True, null=True)
