# Generated by Django 5.0.4 on 2024-05-18 04:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('configuration', '0004_graphicalschedulesetting_student_details'),
    ]

    operations = [
        migrations.AddField(
            model_name='graphicalschedulesetting',
            name='instructor_details',
            field=models.JSONField(blank=True, null=True),
        ),
    ]