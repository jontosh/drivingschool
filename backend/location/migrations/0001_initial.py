# Generated by Django 5.0.4 on 2024-04-24 14:33

import colorfield.fields
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='LocationSmall',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('address', models.TextField()),
                ('note', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('code', models.CharField(max_length=100)),
                ('status', models.CharField(choices=[('ACTIVE', 'ACTIVE'), ('DELETED', 'DELETED'), ('INACTIVE', 'INACTIVE')], max_length=100)),
                ('type', models.CharField(choices=[(' Main office only', 0), ('Main office with classroom', 1), ('Class Room', 2), (' Other (Satellite Office Only)', 3), ('Other Classroom (Satellite Office with Classroom)', 4), ('Range', 5)], max_length=100)),
                ('address', models.TextField()),
                ('city', models.CharField(max_length=200)),
                ('zip', models.CharField(max_length=50)),
                ('location_manager', models.CharField(max_length=200)),
                ('county', models.CharField(max_length=200)),
                ('phone_main', models.CharField(max_length=100)),
                ('fax', models.CharField(max_length=100)),
                ('other', models.CharField(max_length=100)),
                ('location_note', models.TextField()),
                ('has_color', models.BooleanField(default=False)),
                ('color', colorfield.fields.ColorField(default='#FF0000', image_field=None, max_length=25, samples=None)),
                ('has_distance_based_scheduling', models.BooleanField(default=False)),
                ('distance_based_scheduling', models.IntegerField(default=0)),
                ('provider_location_id', models.CharField(blank=True, max_length=200)),
                ('send_drive_available_email_on_appointment_cancellation', models.BooleanField(default=False)),
                ('drop_off', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='dropOff', to='location.locationsmall')),
                ('pick_up', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pickUp', to='location.locationsmall')),
            ],
        ),
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('code', models.PositiveBigIntegerField()),
                ('email', models.EmailField(max_length=254)),
                ('note', models.TextField()),
                ('zipcode', models.IntegerField()),
                ('city', models.CharField(max_length=200)),
                ('state', models.CharField(max_length=200)),
                ('status', models.CharField(choices=[('ACTIVE', 'ACTIVE'), ('DELETED', 'DELETED'), ('INACTIVE', 'INACTIVE')], default='INACTIVE', max_length=100)),
                ('address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='location.locationsmall')),
            ],
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('status', models.CharField(choices=[('ACTIVE', 'ACTIVE'), ('DELETED', 'DELETED'), ('INACTIVE', 'INACTIVE')], default='INACTIVE', max_length=100)),
                ('type', models.CharField(choices=[('BUS', 'BUS'), ('CAR', 'CAR'), ('MOTORCYCLE', 'MOTORCYCLE'), ('SCHOOL BUS', 'SCHOOL BUS'), ('TANKER', 'TANKER'), ('TRACTOR TRAILER', 'TRACTOR TRAILER'), ('TRUCK', 'TRUCK')], max_length=100)),
                ('number', models.CharField(max_length=100)),
                ('make', models.CharField(max_length=150)),
                ('plate', models.CharField(max_length=100)),
                ('has_color', models.BooleanField(default=False)),
                ('color', colorfield.fields.ColorField(default='#FF0000', image_field=None, max_length=25, samples=None)),
                ('note', models.TextField()),
                ('asr_esn_id', models.TextField()),
                ('odometer', models.PositiveIntegerField()),
                ('initial_mileage', models.IntegerField()),
                ('image', models.ImageField(storage='image/vehicles', upload_to='')),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='location.location')),
            ],
        ),
    ]
