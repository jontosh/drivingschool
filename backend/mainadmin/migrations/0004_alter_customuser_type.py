# Generated by Django 5.0.4 on 2024-05-30 05:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainadmin', '0003_rename_home_photo_customuser_home_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mainadmin.usertype'),
        ),
    ]
