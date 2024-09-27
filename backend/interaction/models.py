from django.db import models
from abstracts.models import Status, Extra
from django.apps import apps
from django.contrib import admin
from django.db.models.signals import post_save, pre_delete, pre_save
from django.dispatch import receiver
from django.conf import settings

import mainadmin.models


class Tasks(Extra):
    STATUS = [
        ["NEW","NEW"],
        ["OPEN","OPEN"],
        ["DORMANT","DORMANT"],
        ["FOLLOWUP","FOLLOWUP"],
        ["WAITING FEEDBACK","WAITING FEEDBACK"],
        ["COMPLETED","COMPLETED"],
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
    status = models.CharField(choices=STATUS,max_length=40,default="NEW")
    due_date = models.DateTimeField()
    assign = models.CharField(choices=ASSIGN_TYPE,max_length=40,default=0)
    priority = models.CharField(max_length=10,default="LOW",choices=PRIORITY)
    def __str__(self):
        return self.subject
class LatestNews(models.Model):
    title = models.TextField()
    description = models.TextField()
    data = models.DateTimeField(auto_now_add=True)
    order_number = models.AutoField(primary_key=True)
    def __str__(self):
        return self.title

class Resources(models.Model):
    to_class = models.TextField(blank=True,null=True)
    in_car = models.TextField(blank=True,null=True)
    road_test = models.TextField(blank=True,null=True)
    parents = models.TextField(blank=True,null=True)
    def __str__(self):
        return  self.pk

class Logs(models.Model):
    time = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,blank=True,null=True)
    action = models.TextField()
    method = models.TextField()
    ip_address = models.GenericIPAddressField(blank=True,null=True)
    code = models.TextField(blank=True,null=True)
    full_url = models.URLField(blank=True,null=True)
    processing_time = models.FloatField()
    host = models.CharField(max_length=100,blank=True,null=True)
    def __str__(self):
        return f"{self.action}\t{self.method}"

class EmailTemplate(models.Model):
    """
    Here we will save data which will come from email template section. It will automatically edited
    It will be linked to Student or Instructor. User have to choose one
    if you choose 2 of them or nether of them data will not be saved
    """
    email = models.TextField()
    student = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,blank=True,null=True,related_name="student_email")
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,blank=True,null=True,related_name="staff_email")

    def __str__(self):
        return str(self.id)

class Template(Status,Extra):
    name = models.CharField(max_length=150)
    template = models.TextField()

    def __str__(self):
        return self.name

class SendTemplate(models.Model):
    template = models.ForeignKey("Template",related_name="send_template",on_delete=models.CASCADE)
    to = models.ManyToManyField("mainadmin.CustomUser",related_name="send_to")

    def __str__(self):
        return f"{self.template.name} - {self.pk}"

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