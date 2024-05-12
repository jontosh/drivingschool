# Generated by Django 5.0.4 on 2024-05-12 07:55

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='EmailTemplates',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(choices=[('a', 'a'), ('a', 'a')], max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='LatestNews',
            fields=[
                ('title', models.TextField()),
                ('description', models.TextField()),
                ('data', models.DateTimeField(auto_now_add=True)),
                ('order_number', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Tasks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('extra', models.JSONField(blank=True, null=True)),
                ('note', models.TextField(blank=True, null=True)),
                ('subject', models.CharField(max_length=100)),
                ('status', models.CharField(choices=[('New', 'New'), ('Open', 'Open'), ('Dormant', 'Dormant'), ('FollowUp', 'FollowUp'), ('Waiting Feedback', 'Waiting Feedback'), ('Completed', 'Completed')], default='New', max_length=40)),
                ('due_date', models.DateTimeField()),
                ('assign', models.CharField(choices=[('For My Eyes Only', 'For My Eyes Only'), ('Assign To Staff', ' Assign To Staff'), ('Show To All Admins', 'Show To All Admins')], default=0, max_length=40)),
                ('priority', models.CharField(choices=[('LOW', 'LOW'), ('MEDIUM', 'MEDIUM'), ('URGENT', 'URGENT')], default='LOW', max_length=10)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Logs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now=True)),
                ('action', models.TextField()),
                ('method', models.TextField()),
                ('ip_address', models.GenericIPAddressField(blank=True, null=True)),
                ('code', models.TextField(blank=True, null=True)),
                ('full_url', models.URLField(blank=True, null=True)),
                ('processing_time', models.FloatField()),
                ('host', models.CharField(blank=True, max_length=100, null=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
