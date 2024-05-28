# Generated by Django 5.0.4 on 2024-05-26 02:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0006_rename_home_photo_user_home_phone_alter_user_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='_is_active',
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.CreateModel(
            name='CustomToken',
            fields=[
                ('key', models.CharField(max_length=40, primary_key=True, serialize=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='custom_token', to='Users.user')),
            ],
        ),
    ]
