from django.contrib import admin
from .models import Client,Domain,CustomUser,UserType,Rights,Fields
# Register your models here.
admin.site.register(Client)
admin.site.register(Domain)
admin.site.register(CustomUser)
admin.site.register(UserType)
admin.site.register(Rights)
admin.site.register(Fields)

