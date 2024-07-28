from django.contrib import admin
from .models import AddOn, Services, Component, Fee, Discount, Question, Answer, QuestionType, Test, StudentQuestion, StudentTest
# Register your models here.
admin.site.register(AddOn),
admin.site.register(Services),
admin.site.register(Component),
admin.site.register(Fee),
admin.site.register(Discount),
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(QuestionType)
admin.site.register(Test)
admin.site.register(StudentQuestion)
admin.site.register(StudentTest)