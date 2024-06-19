from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(TimeRange)
admin.site.register(DateRange)
admin.site.register(TimeOff)
admin.site.register(TimeSlot)
admin.site.register(Appointment)