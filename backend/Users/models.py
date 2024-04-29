from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from colorfield.fields import ColorField
from location.models import Vehicle,Location,School
from django.contrib.contenttypes.fields import GenericRelation

#USER
class User(models.Model):
    class Meta:
        abstract = True
    STATUS = [
        ["Active", "Active"],
        ["Deleted", "Deleted"],
        ["Pending", "Pending"],
    ]
    id = models.UUIDField(auto_created=True,primary_key=True,unique=True)
    status = models.CharField(choices=STATUS, max_length=30,default="Pending")
    first_name = models.CharField(max_length=200)
    mid_name = models.CharField(max_length=200, blank=True,null=True)
    last_name = models.CharField(max_length=200)
    address = models.TextField()
    city = models.CharField(max_length=200,blank=True,null=True)
    state = models.CharField(max_length=200,blank=True,null=True)
    zip = models.CharField(max_length=30,blank=True,null=True)
    email = models.EmailField()
    code = models.CharField(max_length=150, blank=True,null=True)
    home_photo = PhoneNumberField(blank=True,null=True)
    cell_phone = PhoneNumberField()
    birth = models.DateField(default="1999/01/01",help_text="Data of birth")
    username = models.CharField(max_length=200,unique=True)
    password = models.CharField(max_length=200, blank=True,null=True)







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
    location = models.ForeignKey(Location,on_delete=models.CASCADE,blank=True,null=True)
    vehicle = models.ForeignKey(Vehicle,on_delete=models.CASCADE, blank=True,null=True)
    emergency_name= models.CharField(max_length=200,blank=True,null=True,help_text="Emergency contact name")
    emergency_relation= models.CharField(max_length=200,blank=True,null=True,help_text="Emergency  relation")
    emergency_phone= PhoneNumberField(blank=True,null=True,help_text="Emergency contact phone")
    permit_number = models.CharField(max_length=200, blank=True,null=True)
    car_permit_data = models.DateField(default="1999/01/01",blank=True,null=True,help_text="MM/DD/YYYY")
    car_permit_expire = models.DateField(default="1999/01/01",blank=True,null=True,help_text="MM/DD/YYYY")
    color = ColorField(default = "#FFFFFF")
    zoom = models.TextField(blank=True,null=True, help_text="Link that appear in student or instructor portal to attend zoom class")
    picture = models.ImageField(upload_to="image/staff")
    working_hours = models.ManyToManyField("TimeRange",related_name="staff_working_hours")
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
    # He, Him
    # She, Her
    # They, Them
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




