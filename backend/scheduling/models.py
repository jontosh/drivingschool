from django.db import models
from location.models import Vehicle,Location,School
import uuid
from multiselectfield import MultiSelectField
from django.contrib.postgres.fields import ArrayField
# Create your models here.
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
    start = models.DateTimeField(blank=True,null=True, )
    end = models.DateTimeField(blank=True,null=True, )
class DateRange(models.Model):
    name = models.CharField(max_length=200,blank=True,null=True)
    start = models.DateField(blank=True,null=True, )
    end = models.DateField(blank=True,null=True, )
class TimeOff(models.Model):
    STATUS = [
        ["ACTIVE", "ACTIVE"],
        ["DELETED", "DELETED"],
        ["PENDING", "PENDING"],
    ]
    TYPES= [
        ["Federal Holiday","Federal Holiday"],
        ["State Holiday","State Holiday"],
        ["Religious Holiday","Religious Holiday"],
        ["Corporate Off","Corporate Off"],
    ]
    id = models.UUIDField(auto_created=True, primary_key=True, unique=True,blank=True,)
    name = models.CharField(max_length=200)
    status = models.CharField(choices=STATUS, max_length=30, default="PENDING")
    code = models.CharField(max_length=150, blank=True,null=True)
    type = models.CharField(choices=TYPES, max_length=30, default="Corporate Off")
    date = models.DateField(default="02/22/2024",help_text="MM/DD/YYYY")
    is_all_day = models.BooleanField(default=False)
    start = models.DateField(blank=True, null=True, )
    end = models.DateField(blank=True, null=True, )
    is_assign_new_staff = models.BooleanField(default=False)
    is_assign_all_staff = models.BooleanField(default=False)
    staff = models.ManyToManyField("Users.Instructor",related_name="time_off_staff")
    note = models.TextField(blank=True)
    extra = models.JSONField(blank=True)
    def __str__(self):
        return self.name
    def save(self, *args, **kwargs):
        if not self.id:
            self.id = uuid.uuid4()
        super().save(*args, **kwargs)
class TimeSlot(models.Model):
    """
    Here we will store available slots for staff
    """
    TYPE = [
        ["Single Appointment(Driver Only)Road","Single Appointment (Driver Only)"],
        ["Road Test(DriverOnly)","Road Test (Driver Only)"],
    ]
    WEEK_CHOICES = [
        ['mon', 'Monday'],
        ['tue', 'Tuesday'],
        ['wed', 'Wednesday'],
        ['thu', 'Thursday'],
        ['fri', 'Friday'],
        ['sat', 'Saturday'],
        ['sun', 'Sunday'],
    ]
    type = models.CharField(choices=TYPE,max_length=50)
    staff = models.ForeignKey("Users.Instructor", on_delete=models.CASCADE, related_name="appointment_staff")
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    date = models.DateField()
    date_range = models.ForeignKey("DateRange",on_delete=models.CASCADE)
    week_range = ArrayField(models.CharField(choices=WEEK_CHOICES,max_length=15,default='mon'),default=list)
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
    student = models.ManyToManyField("Users.Student",related_name='apt_students')
    class Meta:
        unique_together = ['time_slot', 'id']