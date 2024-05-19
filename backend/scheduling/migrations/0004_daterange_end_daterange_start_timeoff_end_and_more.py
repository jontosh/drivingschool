# Generated by Django 5.0.4 on 2024-05-18 09:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scheduling', '0003_remove_daterange_end_time_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='daterange',
            name='end',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='daterange',
            name='start',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='timeoff',
            name='end',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='timeoff',
            name='start',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='timerange',
            name='end',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='timerange',
            name='start',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]