# Generated by Django 5.0.4 on 2024-06-05 07:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0005_alter_howdidyouhearus_status_alter_vehicle_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='drop_off',
            field=models.CharField(blank=True, default='LocationSmall', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='location',
            name='pick_up',
            field=models.CharField(blank=True, default='LocationSmall', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='school',
            name='address',
            field=models.CharField(blank=True, default='LocationSmall', null=True),
        ),
    ]
