# Generated by Django 5.0.4 on 2024-10-03 05:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0015_remove_user_type_delete_customtoken_delete_user'),
        ('scheduling', '0009_appointment_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='VideoLecture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('ACTIVE', 'ACTIVE'), ('DELETED', 'DELETED'), ('INACTIVE', 'INACTIVE')], default='INACTIVE', max_length=100)),
                ('extra', models.JSONField(blank=True, null=True)),
                ('note', models.TextField(blank=True, null=True)),
                ('video', models.FileField(blank=True, upload_to='video/video_lessons')),
                ('theme', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True)),
                ('_has_test', models.BooleanField(default=False)),
                ('views', models.PositiveIntegerField(default=0)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='VideoLectureTest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('answers', models.JSONField(blank=True)),
                ('weight', models.PositiveSmallIntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='VideoLectureSection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('ACTIVE', 'ACTIVE'), ('DELETED', 'DELETED'), ('INACTIVE', 'INACTIVE')], default='INACTIVE', max_length=100)),
                ('extra', models.JSONField(blank=True, null=True)),
                ('note', models.TextField(blank=True, null=True)),
                ('text', models.TextField(blank=True)),
                ('name', models.CharField(max_length=100)),
                ('student_count', models.PositiveIntegerField(default=0)),
                ('lectures', models.ManyToManyField(related_name='section_lecture', to='scheduling.videolecture')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='VideoLectureSectionStudent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('progress', models.PositiveSmallIntegerField(default=0)),
                ('total_score', models.PositiveSmallIntegerField(default=0)),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scheduling.videolecturesection')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Users.student')),
            ],
        ),
        migrations.CreateModel(
            name='VideoLectureStudent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('extra', models.JSONField(blank=True, null=True)),
                ('note', models.TextField(blank=True, null=True)),
                ('answer', models.JSONField(blank=True)),
                ('ball', models.PositiveSmallIntegerField(default=0)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Users.student')),
                ('video_lecture', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scheduling.videolecture')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='videolecture',
            name='tests',
            field=models.ManyToManyField(blank=True, to='scheduling.videolecturetest'),
        ),
        migrations.AddConstraint(
            model_name='videolecturesectionstudent',
            constraint=models.UniqueConstraint(fields=('student', 'section'), name='unique_student_section'),
        ),
    ]
