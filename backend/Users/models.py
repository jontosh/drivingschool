from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from colorfield.fields import ColorField
from location.models import Vehicle,Location,School
from django.contrib.contenttypes.fields import GenericRelation
from abstracts.models import  Status,Extra
from servises.models import Services
from creditcards.models import CardNumberField, CardExpiryField, SecurityCodeField
import uuid

class User(models.Model):
    STATUS = [
        ["Active", "Active"],
        ["Deleted", "Deleted"],
        ["Pending", "Pending"],
    ]
    id = models.UUIDField(auto_created=True, primary_key=True, unique=True,blank=True)
    status = models.CharField(choices=STATUS, max_length=30, default="Pending")
    first_name = models.CharField(max_length=200)
    mid_name = models.CharField(max_length=200, blank=True, null=True)
    last_name = models.CharField(max_length=200)
    address = models.TextField()
    city = models.CharField(max_length=200, blank=True, null=True)
    state = models.CharField(max_length=200, blank=True, null=True)
    zip = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField()
    code = models.CharField(max_length=150, blank=True, null=True)
    home_photo = PhoneNumberField(blank=True, null=True)
    cell_phone = PhoneNumberField()
    birth = models.DateField(default="1999/01/01", help_text="Data of birth")
    username = models.CharField(max_length=200, unique=True)
    password = models.CharField(max_length=200, blank=True, null=True)
    type = models.ForeignKey("UserType", on_delete=models.CASCADE, default=0)

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = uuid.uuid4()
        super().save(*args, **kwargs)

#INSTRACTOR
class Instructor(User):
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
    emergency_phone= PhoneNumberField(blank=True,null=True,help_text="Emergency contact phone")
    permit_number = models.CharField(max_length=200, blank=True,null=True)
    car_permit_data = models.DateField(default="1999/01/01",blank=True,null=True,help_text="MM/DD/YYYY")
    car_permit_expire = models.DateField(default="1999/01/01",blank=True,null=True,help_text="MM/DD/YYYY")
    color = ColorField(default = "#FFFFFF")
    zoom = models.TextField(blank=True,null=True, help_text="Link that appear in student or instructor portal to attend zoom class")
    picture = models.ImageField(upload_to="image/staff",blank=True,null=True)
    working_hours = models.ManyToManyField("TimeRange",related_name="staff_working_hours",blank=True,)
    message_items = GenericRelation(
        'configuration.MessageItems',
        'product_object_id',
        'product_content_type_id',
        related_query_name='User',
    )
    def __str__(self):
        return self.username






#STUDENT
class Student(User):

    PREFERRED_PRONOUNS = [
        ["He, Him",0],
        ["She, Her",1],
        ["They, Them",2],
    ]
    GENDER = [
        ["Male","Male"],
        ["Female", "Female"],
        ["Other", "Other"],
    ]
    staff = models.ForeignKey(Instructor,on_delete=models.CASCADE,related_name="student_staff",null=True)
    location = models.ForeignKey(Location,on_delete=models.CASCADE,null=True)
    # student_id = models.AutoField()
    home_pickup = models.TextField(blank=True,null=True)
    Gender = models.CharField(choices=GENDER,max_length=30,default="Male")
    high_school = models.ForeignKey(School,on_delete=models.CASCADE,blank=True,null=True)
    preferred_pronoun = models.CharField(max_length=30,choices=PREFERRED_PRONOUNS,default=0)
    dl_permit = models.TextField(blank=True,null=True)
    dl_given_date =  models.DateField(default="1999/01/01",blank=True,null=True,help_text="MM/DD/YYYY")
    dl_expire_date =  models.DateField(default="1999/01/01",blank=True,null=True,help_text="MM/DD/YYYY")
    note = models.TextField(blank=True,null=True)
    medical_condition = models.TextField(blank=True,null=True)
    parent_name = models.CharField(max_length=200)
    parent_email = models.EmailField(blank=True,null=True)
    parent_phone = PhoneNumberField(blank=True,null=True)
    parent_2_name = models.CharField(max_length=200)
    parent_2_email = models.EmailField(blank=True,null=True)
    parent_2_phone = PhoneNumberField(blank=True,null=True)
    def __str__(self):
        return  f"{self.first_name} {self.last_name}"
class Enrollment(Extra):
    student = models.ForeignKey("Student",on_delete=models.CASCADE,related_name="enrolled_user")
    data = models.DateField(auto_now_add=True)
    code = models.IntegerField()
    by  = models.ForeignKey("User",on_delete=models.CASCADE,related_name="enrolled_by")
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
    is_deposited = models.BooleanField(default=False)
    adjust_type = models.CharField(choices=ADJUST_TYPE,max_length=40,default="Discount (Subtract from balance)",blank=True,null=True)
    def __str__(self):
        return f"{self.price}"


class Weekday(models.TextChoices):
    MONDAY = 'MON', 'Monday'
    TUESDAY = 'TUE', 'Tuesday'
    WEDNESDAY = 'WED', 'Wednesday'
    THURSDAY = 'THU', 'Thursday'
    FRIDAY = 'FRI', 'Friday'
    SATURDAY = 'SAT', 'Saturday'
    SUNDAY = 'SUN', 'Sunday'
class WeekRange(models.Model):
    week = models.CharField(choices=Weekday,unique=True,blank=False,max_length=15)
    def __str__(self):
        return self.week
class TimeRange(models.Model):
    day_of_week = models.CharField(max_length=3, choices=Weekday.choices,blank=True,null=True)
    name = models.CharField(max_length=200,blank=True,null=True)
    start_time = models.TimeField(blank=True,null=True, )
    end_time = models.TimeField(blank=True,null=True, )
class DateRange(models.Model):
    name = models.CharField(max_length=200,blank=True,null=True)
    start_time = models.TimeField(blank=True,null=True, )
    end_time = models.TimeField(blank=True,null=True, )


class TimeOff(models.Model):
    STATUS = [
        ["Active", "Active"],
        ["Deleted", "Deleted"],
        ["Pending", "Pending"],
    ]
    TYPES= [
        ["Federal Holiday","Federal Holiday"],
        ["State Holiday","State Holiday"],
        ["Religious Holiday","Religious Holiday"],
        ["Corporate Off","Corporate Off"],
    ]
    id = models.UUIDField(auto_created=True, primary_key=True, unique=True)
    name = models.CharField(max_length=200)
    status = models.CharField(choices=STATUS, max_length=30, default="Pending")
    code = models.CharField(max_length=150, blank=True,null=True)
    type = models.CharField(choices=TYPES, max_length=30, default="Corporate Off")
    date = models.DateField(default="02/22/2024",help_text="MM/DD/YYYY")
    is_all_day = models.BooleanField(default=False)
    start_time = models.TimeField(blank=True, null=True, )
    end_time = models.TimeField(blank=True, null=True, )
    is_assign_new_staff = models.BooleanField(default=False)
    is_assign_all_staff = models.BooleanField(default=False)
    staff = models.ManyToManyField("Instructor",related_name="time_off_staff")
    note = models.TextField(blank=True)
    extra = models.JSONField(blank=True)
    def __str__(self):
        return self.name
class TimeSlot(models.Model):
    """
    Here we will store available slots for staff
    """
    TYPE = [
        ["Single Appointment(Driver Only)Road","Single Appointment (Driver Only)"],
        ["Road Test(DriverOnly)","Road Test (Driver Only)"],
    ]

    type = models.CharField(choices=TYPE,max_length=50)
    staff = models.ForeignKey(Instructor, on_delete=models.CASCADE, related_name="appointment_staff")
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    date = models.DateField()
    date_range = models.ForeignKey("DateRange",on_delete=models.CASCADE)
    week_range = models.ManyToManyField(WeekRange,related_name="weeks")
    slots = models.ManyToManyField(TimeRange,related_name="time_slot")
    pu_location = models.CharField(max_length=200)
    show_in_student_center = models.BooleanField(default=False)
    slot_duration = models.IntegerField(default=0,blank=True)
    slots_per_day = models.IntegerField(default=1,blank=False)

class Appointment(models.Model):
    """
    Assign slot for student
    """
    time_slot = models.ForeignKey("TimeSlot",on_delete=models.CASCADE)
    student = models.ManyToManyField("Student",related_name='apt_students')
    class Meta:
        unique_together = ['time_slot', 'id']


class HowDidYouHearUs(models.Model):
    name = models.CharField(max_length=200)
    STATUS = [
        ["Active", "Active"],
        ["Deleted", "Deleted"],
        ["Pending", "Pending"],
    ]
    status = models.CharField(choices=STATUS, max_length=30, default="Pending")
    def __str__(self):
        return f"{self.name} \t {self.status}"


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
    by = models.ForeignKey("User", on_delete=models.CASCADE,related_name="file_by")
    student = models.ForeignKey("Student",on_delete=models.CASCADE,blank=True,null=True,related_name="file_from")
    category = models.ForeignKey("FileCategory",on_delete=models.CASCADE)
    file = models.FileField(upload_to="files/student")
    date = models.DateTimeField(auto_now_add=True)