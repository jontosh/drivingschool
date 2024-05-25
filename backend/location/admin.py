from django.contrib import admin
from .models import Location, Class,School,Vehicle
# Register your models here.
admin.site.register(Location),
admin.site.register(Class),
admin.site.register(School),
admin.site.register(Vehicle),