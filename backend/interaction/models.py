from django.db import models
from abstracts.models import Status, Extra
from django.apps import apps
from django.contrib import admin
from django.db.models.signals import post_save, pre_delete, pre_save
from django.dispatch import receiver
from django.contrib.auth.models import User

class Question(models.Model):
    type = models.ForeignKey("QuestionType",on_delete=models.CASCADE)
    question = models.TextField()
    answers = models.ManyToManyField("Answer")
class Answer(models.Model):
    """
    Model to represent possible answers for multiple choice questions
    """
    text = models.TextField()
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.text} ({'Correct' if self.is_correct else 'Incorrect'})"
class QuestionType(models.Model):
    """
    Model to represent different types of quiz questions (e.g., Multiple Choice, True/False)
    """
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name



class Test(Status,Extra,models.Model):
    """
    Model to represent tests containing a collection of questions
    """
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    questions = models.ManyToManyField(Question, )#related_name="question_test")
    _is_display_name = models.BooleanField(default=False)
    count = models.IntegerField(verbose_name="number of question")
    passing_grade = models.IntegerField(default=1)
    is_final = models.BooleanField(default=False)
    is_class_session = models.BooleanField(default=False,verbose_name="Associate with This Class Session")
    is_attendance_required = models.BooleanField(default=False,verbose_name="Attendance Required for Associated Session only")
    timer = models.TimeField(blank=True)
    is_timer = models.BooleanField(default=False)
    allow_view_complete = models.BooleanField(default=False,verbose_name="Allow Students to View Completed Quizzes")
    welcome_text = models.TextField(blank=True)
    pass_text = models.TextField(blank=True)
    fall_text = models.TextField(blank=True)
    service = models.ManyToManyField("servises.Services",)
    cr = models.ManyToManyField("location.Class",related_name="classroom")



    def __str__(self):
        return self.name



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