# Generated by Django 5.0.4 on 2024-06-12 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('servises', '0007_remove_services_discription_services_description_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='services',
            name='description',
        ),
        migrations.RemoveField(
            model_name='services',
            name='key',
        ),
        migrations.RemoveField(
            model_name='services',
            name='title',
        ),
        migrations.AlterField(
            model_name='discount',
            name='expiration_data',
            field=models.DateField(default='1999-01-01'),
        ),
    ]