from django.contrib import admin
from .models import CompanyInfo, WebContent,ZipCode,StorageManagement,EmergencyData,MessageItems,Messages,Fields,\
    GeneralSetting,GraphicalScheduleSetting,PasswordManagement,Rights,Expanses
# Register your models here.
admin.site.register(CompanyInfo)
admin.site.register(Rights)
admin.site.register(WebContent)
admin.site.register(ZipCode)
admin.site.register(EmergencyData)
admin.site.register(MessageItems)
admin.site.register(StorageManagement)
admin.site.register(Messages)
admin.site.register(Fields)
admin.site.register(GeneralSetting)
admin.site.register(GraphicalScheduleSetting)
admin.site.register(PasswordManagement)
admin.site.register(Expanses)
