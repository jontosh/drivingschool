# Generated by Django 5.0.4 on 2024-05-12 07:55

import creditcards.models
import phonenumber_field.modelfields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('extra', models.JSONField(blank=True, null=True)),
                ('note', models.TextField(blank=True, null=True)),
                ('type', models.CharField(choices=[('Process Credit Card', 'Process Credit Card'), ('Swiped Transaction', ' Swiped Transaction'), ('Cash Payment', ' Cash Payment'), ('Check Payment', ' Check Payment'), ('Adjustment', ' Adjustment')], default='Adjustment', max_length=30)),
                ('data', models.DateField(auto_now_add=True)),
                ('code', models.IntegerField()),
                ('price', models.PositiveIntegerField(default=0)),
                ('cc_number', creditcards.models.CardNumberField(blank=True, max_length=25, null=True, verbose_name='card number')),
                ('cc_expiry', creditcards.models.CardExpiryField(blank=True, null=True, verbose_name='expiration date')),
                ('cc_code', creditcards.models.SecurityCodeField(blank=True, max_length=4, null=True, verbose_name='security code')),
                ('card_type', models.CharField(blank=True, max_length=50)),
                ('card_last_4_digits', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('name_on_card', models.CharField(blank=True, max_length=200, null=True)),
                ('address', models.TextField(blank=True)),
                ('city', models.TextField(blank=True)),
                ('state', models.TextField(blank=True)),
                ('zip', models.TextField(blank=True)),
                ('receipt_number', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('transaction_number', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('check_number', models.TextField(blank=True)),
                ('is_deposited', models.BooleanField(default=False)),
                ('adjust_type', models.CharField(blank=True, choices=[('Discount (Subtract from balance)', 'Discount (Subtract from balance)'), ('Refund (Add to balance)', 'Refund (Add to balance)'), ('Lead Discount (Subtract from balance)', 'Lead Discount (Subtract from balance)'), ('Other (Subtract from balance)', 'Other (Subtract from balance)'), ('Wrong Charge (Subtract from balance)', 'Wrong Charge (Subtract from balance)')], default='Discount (Subtract from balance)', max_length=40, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Enrollment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('extra', models.JSONField(blank=True, null=True)),
                ('note', models.TextField(blank=True, null=True)),
                ('data', models.DateField(auto_now_add=True)),
                ('code', models.IntegerField()),
                ('price', models.PositiveIntegerField(default=0)),
                ('cr_start', models.DateField(blank=True, null=True)),
                ('cr_end', models.DateField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='FileCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('ACTIVE', 'ACTIVE'), ('DELETED', 'DELETED'), ('INACTIVE', 'INACTIVE')], default='INACTIVE', max_length=100)),
                ('extra', models.JSONField(blank=True, null=True)),
                ('note', models.TextField(blank=True, null=True)),
                ('name', models.CharField(max_length=200)),
                ('signature', models.URLField(verbose_name='Signature link')),
                ('has_portal', models.BooleanField(default=False, verbose_name='Display on Student Portal')),
                ('has_category_portal', models.BooleanField(default=False, verbose_name='Disallow files associated with category from displaying on Student Portal')),
                ('has_student_account', models.BooleanField(default=False, verbose_name='Must Be Uploaded to Student Account')),
                ('has_teacher_portal', models.BooleanField(default=False, verbose_name='Disallow files associated with this category from displaying on Instructor/Teacher Portal')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Files',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('extra', models.JSONField(blank=True, null=True)),
                ('note', models.TextField(blank=True, null=True)),
                ('name', models.TextField()),
                ('file', models.FileField(upload_to='files/student')),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.UUIDField(auto_created=True, blank=True, primary_key=True, serialize=False, unique=True)),
                ('status', models.CharField(choices=[('Active', 'Active'), ('Deleted', 'Deleted'), ('Pending', 'Pending')], default='Pending', max_length=30)),
                ('first_name', models.CharField(max_length=200)),
                ('mid_name', models.CharField(blank=True, max_length=200, null=True)),
                ('last_name', models.CharField(max_length=200)),
                ('address', models.TextField()),
                ('city', models.CharField(blank=True, max_length=200, null=True)),
                ('state', models.CharField(blank=True, max_length=200, null=True)),
                ('zip', models.CharField(blank=True, max_length=30, null=True)),
                ('email', models.EmailField(max_length=254)),
                ('code', models.CharField(blank=True, max_length=150, null=True)),
                ('home_photo', phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, null=True, region=None)),
                ('cell_phone', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None)),
                ('birth', models.DateField(default='1999/01/01', help_text='Data of birth')),
                ('username', models.CharField(max_length=200, unique=True)),
                ('password', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
    ]
