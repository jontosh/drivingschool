from django.contrib import admin
from .models import  Instructor,Student,Enrollment,FileCategory,UserType,Files,Bill
# Register your models here.
admin.site.register(FileCategory),
admin.site.register(UserType),
admin.site.register(Instructor),
admin.site.register(Student),
admin.site.register(Enrollment),
admin.site.register(Files),
admin.site.register(Bill),