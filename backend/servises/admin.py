from django.contrib import admin
from .models import AddOn, Services,Component,Fee,Discount
# Register your models here.
admin.site.register(AddOn),
admin.site.register(Services),
admin.site.register(Component),
admin.site.register(Fee),
admin.site.register(Discount),