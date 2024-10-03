# Generated by Django 5.0.4 on 2024-10-01 07:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scheduling', '0008_timeslot_extra_timeslot_note_timeslot_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='status',
            field=models.CharField(choices=[('ACTIVE', 'ACTIVE'), ('DELETED', 'DELETED'), ('INACTIVE', 'INACTIVE')], default='INACTIVE', max_length=100),
        ),
    ]
