from django.contrib import admin
from .models import  WorkingHours,Instructor,Student
# Register your models here.
admin.site.register(WorkingHours),
admin.site.register(Instructor),
admin.site.register(Student),