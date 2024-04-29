from django.contrib import admin
from .models import CompanyInfo, WebContent,ZipCode,StorageManagement,EmergencyData,MessageItems,Messages
# Register your models here.
admin.site.register(CompanyInfo),
admin.site.register(WebContent),
admin.site.register(ZipCode),
admin.site.register(EmergencyData),
admin.site.register(MessageItems),
admin.site.register(StorageManagement),
admin.site.register(Messages),