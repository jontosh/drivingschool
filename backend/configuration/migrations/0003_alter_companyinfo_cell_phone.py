# Generated by Django 5.0.4 on 2024-05-16 01:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('configuration', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyinfo',
            name='cell_phone',
            field=models.CharField(blank=True, null=True),
        ),
    ]
