from django.db import models
from django.contrib.auth.models import AbstractUser
from colorfield.fields import ColorField
from location.models import Vehicle,Location,School
from django.contrib.contenttypes.fields import GenericRelation
from abstracts.models import  Status,Extra
from servises.models import Services
from scheduling.models import TimeRange
from creditcards.models import CardNumberField, CardExpiryField, SecurityCodeField
import uuid
from mainadmin.models import CustomUser
from django.conf import  settings


#INSTRACTOR
class Instructor(CustomUser):
    STAFF_TYPE = [
        ["Instructor","Instructor"],
        ["Instructor / Teacher","Instructor/Teacher"],
        ["Junior Admin","Junior Admin"],
        ["Office Manager","Office Manager"],
        ["Owner","Owner"],
        ["Senior Admin","Senior Admin"],
        ["Teacher","Teacher"],
    ]
    staff_type = models.CharField(choices=STAFF_TYPE,max_length=50,default="Instructor")
    location = models.ForeignKey("location.Location",on_delete=models.CASCADE,null=True,blank=True)
    vehicle = models.ForeignKey("location.Vehicle",on_delete=models.CASCADE, blank=True,null=True)
    emergency_name= models.CharField(max_length=200,blank=True,null=True,help_text="Emergency contact name")
    emergency_relation= models.CharField(max_length=200,blank=True,null=True,help_text="Emergency  relation")
    emergency_phone= models.CharField(blank=True,null=True,help_text="Emergency contact phone",max_length=30)
    permit_number = models.CharField(max_length=200, blank=True,null=True)
    car_permit_data = models.DateField(default="1999-01-01",blank=True,null=True,help_text="MM/DD/YYYY")
    car_permit_expire = models.DateField(default="1999-01-01",blank=True,null=True,help_text="MM/DD/YYYY")
    color = ColorField(default = "#FFFFFF")
    zoom = models.TextField(blank=True,null=True, help_text="Link that appear in student or instructor portal to attend zoom class")
    picture = models.ImageField(upload_to="image/staff",blank=True,null=True)
    working_hours = models.ManyToManyField(TimeRange,related_name="staff_working_hours",blank=True,)
    message_items = GenericRelation(
        'configuration.MessageItems',
        'from_object_id',
        'from_content_type_id',
        related_query_name='User',
    )
    def __str__(self):
        return self.username

#STUDENT
class Student(CustomUser):

    PREFERRED_PRONOUNS = [
        ["He", "He"],
        ["She", "She"],
        ["Other", "Other"],
    ]
    GENDER = [
        ["Male","Male"],
        ["Female", "Female"],
        ["Other", "Other"],
    ]
    TYPE = [
        ["Teen","Teen"],
        ["Adult","Adult"],
        ["Knowledge Test","Knowledge Test"],
        ["Road Test","Road Test"],
    ]
    information_type = models.CharField(choices=TYPE,default="Road Test",)
    staff = models.ForeignKey(Instructor,on_delete=models.CASCADE,related_name="student_staff",null=True)
    location = models.ForeignKey(Location,on_delete=models.CASCADE,null=True)
    home_pickup = models.TextField(blank=True,null=True)
    gender = models.CharField(choices=GENDER,max_length=30,default="Male")
    high_school = models.ForeignKey(School,on_delete=models.CASCADE,blank=True,null=True)
    preferred_pronoun = models.CharField(max_length=30,choices=PREFERRED_PRONOUNS,default=0)
    dl_permit = models.TextField(blank=True,null=True)
    dl_given_date =  models.DateField(default="1999-01-01",blank=True,null=True,help_text="MM/DD/YYYY")
    dl_expire_date =  models.DateField(default="1999-01-01",blank=True,null=True,help_text="MM/DD/YYYY")
    note = models.TextField(blank=True,null=True)
    medical_condition = models.TextField(blank=True,null=True)
    parent_name = models.CharField(max_length=200)
    parent_email = models.EmailField(blank=True,null=True)
    parent_phone = models.CharField(blank=True,null=True,max_length=30)
    parent_2_name = models.CharField(max_length=200)
    parent_2_email = models.EmailField(blank=True,null=True)
    parent_2_phone = models.CharField(max_length=30,blank=True,null=True,db_column="sd")
    extension_data = models.DateField(blank=True,null=True)
    how_did_you_hear_us = models.ForeignKey("location.HowDidYouHearUs",on_delete=models.CASCADE,null=True,blank=True)
    _disable_self_scheduling = models.BooleanField(default=False)
    _payment_plan = models.BooleanField(default=False)
    def __str__(self):
        return  f"{self.first_name} {self.last_name}"
class Enrollment(Extra):
    student = models.ForeignKey("Student",on_delete=models.CASCADE,related_name="enrolled_user")
    data = models.DateField(auto_now_add=True)
    code = models.IntegerField()
    by  = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="enrolled_by")
    price = models.PositiveIntegerField(default=0)
    cr = models.ForeignKey("location.Class",on_delete=models.CASCADE,blank=True,null=True)
    cr_start = models.DateField(blank=True,null=True)
    cr_end = models.DateField(blank=True,null=True)
    package = models.ManyToManyField("servises.Services",related_name="enrolled_services")
    def __str__(self):
        return  f"{self.id}"
class Bill(Extra):
    TYPE = [
        ["Process Credit Card","Process Credit Card"],
        ["Swiped Transaction"," Swiped Transaction"],
        ["Cash Payment"," Cash Payment"],
        ["Check Payment"," Check Payment"],
        ["Adjustment"," Adjustment"],
    ]
    ADJUST_TYPE = [
        ["Discount (Subtract from balance)","Discount (Subtract from balance)"],
        ["Refund (Add to balance)","Refund (Add to balance)"],
        ["Lead Discount (Subtract from balance)","Lead Discount (Subtract from balance)"],
        ["Other (Subtract from balance)","Other (Subtract from balance)"],
        ["Wrong Charge (Subtract from balance)","Wrong Charge (Subtract from balance)"],
    ]
    student = models.ForeignKey("Student", on_delete=models.CASCADE, related_name="bill_user")
    type = models.CharField(max_length=30,choices=TYPE,default="Adjustment")
    data = models.DateField(auto_now_add=True)
    code = models.IntegerField()
    price = models.PositiveIntegerField(default=0)
    package = models.ManyToManyField(Services, related_name="bill_services")
    cc_number = CardNumberField(verbose_name='card number',blank=True,null=True)
    cc_expiry = CardExpiryField(verbose_name='expiration date',blank=True,null=True)
    cc_code = SecurityCodeField(verbose_name='security code',blank=True,null=True)
    card_type = models.CharField(max_length=50,blank=True)
    card_last_4_digits = models.PositiveSmallIntegerField(blank=True,null=True)
    name_on_card = models.CharField(max_length=200,blank=True,null=True)
    address = models.TextField(blank=True)
    city = models.TextField(blank=True)
    state = models.TextField(blank=True)
    zip = models.TextField(blank=True)
    receipt_number = models.PositiveSmallIntegerField(blank=True,null=True)
    transaction_number = models.PositiveSmallIntegerField(blank=True,null=True)
    check_number = models.TextField(blank=True)
    discount = models.ManyToManyField("servises.Discount",related_name="coupon",blank=True)
    is_deposited = models.BooleanField(default=False)
    adjust_type = models.CharField(choices=ADJUST_TYPE,max_length=40,default="Discount (Subtract from balance)",blank=True,null=True)
    def __str__(self):
        return f"{self.price}"

class UserType(models.Model):
    name = models.CharField(max_length=100)
    rights = models.ManyToManyField("configuration.Rights",related_name="user_rights")
    def __str__(self):
        return self.name

class FileCategory(Status,Extra):
    name = models.CharField(max_length=200)
    package = models.ManyToManyField("servises.Services",related_name="package_file")
    signature = models.URLField(verbose_name="Signature link")
    has_portal = models.BooleanField(verbose_name="Display on Student Portal",default=False)
    has_category_portal = models.BooleanField(verbose_name="Disallow files associated with category from displaying on Student Portal",default=False)
    has_student_account = models.BooleanField(verbose_name="Must Be Uploaded to Student Account",default=False)
    has_teacher_portal = models.BooleanField(verbose_name="Disallow files associated with this category from displaying on Instructor/Teacher Portal",default=False)

class Files(Extra):
    name = models.TextField()
    by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name="file_by")
    student = models.ForeignKey("Student",on_delete=models.CASCADE,blank=True,null=True,related_name="file_from")
    category = models.ForeignKey("FileCategory",on_delete=models.CASCADE)
    file = models.FileField(upload_to="files/student")
    date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name

class EmergencyContact(models.Model):
    name = models.CharField(max_length=200,null=True,blank=True)
    relation = models.CharField(max_length=200,null=True,blank=True)
    phone = models.CharField(max_length=200,null=True,blank=True)
    how_did_you_hear_us = models.ManyToManyField("location.HowDidYouHearUs",blank=True)
    medical_condition = models.TextField(null=True,blank=True)
    wear_glass = models.BooleanField(default=False,null=True,blank=True)
    student = models.ForeignKey("Student",on_delete=models.CASCADE)
    def __str__(self):
        return f"Emergency {self.relation} {self.name}"

class StudentNote(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    data_created = models.DateTimeField(auto_now_add=True,editable=False)
    note = models.TextField()
    to_user = models.ForeignKey("mainadmin.CustomUser",on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.id} - {self.note}"
class DrivingNote(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    data_created = models.DateTimeField(auto_now_add=True,editable=False)
    note = models.TextField()
    to_user = models.ForeignKey("mainadmin.CustomUser",on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.id} - {self.note}"
# class CustomToken(models.Model):
#     key = models.CharField(max_length=40, primary_key=True)
#     user = models.OneToOneField(User, related_name='custom_token', on_delete=models.CASCADE)
#     created = models.DateTimeField(auto_now_add=True)
#
#     def __str__(self):
#         return self.key