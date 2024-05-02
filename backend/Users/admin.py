from django.contrib import admin
from .models import  TimeRange,Instructor,Student,TimeSlot,WeekRange,TimeOff,DateRange,Enrollment,\
    Appointment,FileCategory,HowDidYouHearUs,UserType
from .models import  TimeRange,Instructor,Student
# Register your models here.
admin.site.register(Appointment),
admin.site.register(FileCategory),
admin.site.register(HowDidYouHearUs),
admin.site.register(UserType),
admin.site.register(TimeRange),
admin.site.register(Instructor),
admin.site.register(Student),
admin.site.register(DateRange),
admin.site.register(Enrollment),
admin.site.register(TimeOff),
admin.site.register(TimeRange),
admin.site.register(Instructor),
admin.site.register(TimeSlot),
admin.site.register(WeekRange),