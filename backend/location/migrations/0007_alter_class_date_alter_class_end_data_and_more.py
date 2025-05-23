# Generated by Django 5.0.4 on 2024-06-12 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0006_alter_location_pick_up_alter_location_drop_off_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='class',
            name='date',
            field=models.DateField(blank=True, default='1999-01-01', null=True),
        ),
        migrations.AlterField(
            model_name='class',
            name='end_Data',
            field=models.DateField(default='1999-01-01', help_text='MM/DD/YYYY'),
        ),
        migrations.AlterField(
            model_name='class',
            name='start_date',
            field=models.DateField(blank=True, default='1999-01-01', help_text='MM/DD/YYYY', null=True),
        ),
    ]
