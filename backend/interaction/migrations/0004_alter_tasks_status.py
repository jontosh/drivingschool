# Generated by Django 5.0.4 on 2024-05-24 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interaction', '0003_emailtemplate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tasks',
            name='status',
            field=models.CharField(choices=[('NEW', 'NEW'), ('OPEN', 'OPEN'), ('DORMANT', 'DORMANT'), ('FOLLOWUP', 'FOLLOWUP'), ('WAITING FEEDBACK', 'WAITING FEEDBACK'), ('COMPLETED', 'COMPLETED')], default='NEW', max_length=40),
        ),
    ]
