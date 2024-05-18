from django.contrib import admin
from django import  forms
from Users.models import Student,Instructor
from .models import CompanyInfo, WebContent,ZipCode,StorageManagement,EmergencyData,MessageItems,Messages,Fields,\
    GeneralSetting,GraphicalScheduleSetting,PasswordManagement,Rights,Expanses
# Register your models here.
class FieldSelectionForm(forms.ModelForm):
    class Meta:
        model = GraphicalScheduleSetting
        fields = '__all__'

    student_fields = [(field.name, field.verbose_name) for field in Student._meta.get_fields() if hasattr(field, 'verbose_name')]
    instructor_fields = [ (field.name, field.verbose_name) for field in Instructor._meta.get_fields( ) if
                       hasattr(field, 'verbose_name') ]
    student_details = forms.MultipleChoiceField(
        choices=student_fields,
        widget=forms.SelectMultiple,
        required=False,
        label="Select student fields to display"
    )
    instructor_details = forms.MultipleChoiceField(
        choices=instructor_fields,
        widget=forms.SelectMultiple,
        required=False,
        label="Select instructor fields to display"
    )
class FieldSelectionAdmin(admin.ModelAdmin):
    form = FieldSelectionForm
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
admin.site.register(GraphicalScheduleSetting,FieldSelectionAdmin)
admin.site.register(PasswordManagement)
admin.site.register(Expanses)
