# Generated by Django 2.2.6 on 2019-10-21 16:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crm_editor', '0006_auto_20191017_1819'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sale',
            name='dt_created',
            field=models.DateTimeField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='sale',
            name='dt_next_action',
            field=models.DateTimeField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='sale',
            name='dt_update',
            field=models.DateTimeField(blank=True, default=None, null=True),
        ),
    ]
