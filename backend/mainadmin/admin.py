from django.contrib import admin
from .models import Client,Domain,CustomUser
# Register your models here.
admin.site.register(Client)
admin.site.register(Domain)
admin.site.register(CustomUser)

