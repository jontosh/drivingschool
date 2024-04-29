from django.contrib import admin
from .models import Location, LocationSmall,Class,School,Vehicle
# Register your models here.
admin.site.register(Location),
admin.site.register(LocationSmall),
admin.site.register(Class),
admin.site.register(School),
admin.site.register(Vehicle),