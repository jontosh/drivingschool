# Generated by Django 5.0.4 on 2024-05-18 09:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('servises', '0003_remove_component_driving_hours_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='component',
            name='driving_hours',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='component',
            name='end',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='component',
            name='session_duration',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='component',
            name='start',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='test',
            name='timer',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
