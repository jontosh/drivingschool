from django.contrib import admin
from .models import  TimeRange,Instructor,Student
# Register your models here.
admin.site.register(TimeRange),
admin.site.register(Instructor),
admin.site.register(Student),