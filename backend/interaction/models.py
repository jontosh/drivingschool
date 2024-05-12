from django.db import models
from abstracts.models import Status, Extra
from django.apps import apps
from django.contrib import admin
from django.db.models.signals import post_save, pre_delete, pre_save
from django.dispatch import receiver
from django.contrib.auth.models import User



class Tasks(Extra):
    STATUS = [
        ["New","New"],
        ["Open","Open"],
        ["Dormant","Dormant"],
        ["FollowUp","FollowUp"],
        ["Waiting Feedback","Waiting Feedback"],
        ["Completed","Completed"],
    ]
    ASSIGN_TYPE = [
        ["For My Eyes Only","For My Eyes Only"],
       ["Assign To Staff"," Assign To Staff"],
        ["Show To All Admins","Show To All Admins"],
    ]
    PRIORITY = [
        ["LOW","LOW"],
        ["MEDIUM", "MEDIUM"],
        ["URGENT", "URGENT"],
    ]
    subject = models.CharField(max_length=100)
    status = models.CharField(choices=STATUS,max_length=40,default="New")
    due_date = models.DateTimeField()
    assign = models.CharField(choices=ASSIGN_TYPE,max_length=40,default=0)
    priority = models.CharField(max_length=10,default="LOW",choices=PRIORITY)

class LatestNews(models.Model):
    title = models.TextField()
    description = models.TextField()
    data = models.DateTimeField(auto_now_add=True)
    order_number = models.AutoField(primary_key=True)
    def __str__(self):
        return self.title
class EmailTemplates(models.Model):
    text = models.CharField(max_length=500,choices=[["a","a"],["a","a"],])

class EmailTemplatesAdmin(admin.ModelAdmin):
    def get_form(self, request, obj=None, change=False, **kwargs):
        form = super().get_form(request, obj, change, **kwargs)
        all_fields = {}
        for app in apps.get_app_configs():
            for model in app.get_models():
                field_names = [field.name for field in model._meta.get_fields()]
                all_fields[model.__name__] = field_names
        model_fields = all_fields.get(obj.__class__.__name__, [])  # Filter based on model
        form.base_fields['text'].choices = [(field, field) for field in model_fields]

        print(f"Choices for text field: {form.base_fields['text'].choices}")

        return form

class Logs(models.Model):
    time = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,blank=True,null=True)
    action = models.TextField()
    method = models.TextField()
    ip_address = models.GenericIPAddressField(blank=True,null=True)
    code = models.TextField(blank=True,null=True)
    full_url = models.URLField(blank=True,null=True)
    processing_time = models.FloatField()
    host = models.CharField(max_length=100,blank=True,null=True)
    def __str__(self):
        return f"{self.action}\t{self.method}"






admin.site.register(EmailTemplates,EmailTemplatesAdmin)


# @receiver(pre_save, sender=Logs)
# def log_user_actions(sender, instance, **kwargs):
#     request = kwargs['request']
#     user_id = request.path.split('/')[1]
#
#
#     try:
#         user = User.objects.get(id=user_id)
#     except :
#         user = None
#
#     instance.user = user