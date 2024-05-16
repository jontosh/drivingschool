from django.db import models
from colorfield.fields import ColorField
from abstracts.models import Extra
# LOCATION
class Location(models.Model):
    """
    This is module  to create a branch of driving school or school itself.
    """
    Status = [
        ["ACTIVE", "ACTIVE"],
        ["DELETED", "DELETED"],
        ["INACTIVE","INACTIVE"]
    ]
    Type = [
        ["Main office only"," Main office only"],
        ['Main office with classroom',"Main office with classroom"],
        ["Class Room","Class Room"],
        ["Other (Satellite Office Only)"," Other (Satellite Office Only)"],
        ["Other Classroom (Satellite Office with Classroom)","Other Classroom (Satellite Office with Classroom)"],
        ["Range","Range"]
    ]
    Test_Type = [
        ["Road Test",0],
        [" Knowledge Test",1]
    ]
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=100)
    status = models.CharField(choices=Status,max_length=100)
    type = models.CharField(choices=Type,max_length=100)
    address = models.TextField()
    city = models.CharField(max_length=200)
    zip = models.CharField(max_length=50)
    location_manager = models.CharField(max_length=200,blank=True)
    pick_up = models.ForeignKey("LocationSmall",on_delete=models.CASCADE,related_name="pickUp",blank=True,null=True)
    drop_off = models.ForeignKey("LocationSmall",on_delete=models.CASCADE,related_name="dropOff",blank=True,null=True)
    county = models.CharField(max_length=200,blank=True)
    phone_main = models.CharField(max_length=100)
    fax = models.CharField(max_length=100,blank=True)
    other = models.CharField(max_length=100,blank=True)
    location_note = models.TextField(blank=True)
    has_color = models.BooleanField(default=False)
    color = ColorField(default='#FF0000',blank=True)
    has_distance_based_scheduling = models.BooleanField(default=False)
    distance_based_scheduling = models.IntegerField(default=0)
    provider_location_id = models.CharField(blank=True,null=True,max_length=200)
    send_drive_available_email_on_appointment_cancellation= models.BooleanField(default=False)
    def __str__(self):
        return self.name
# SCHOOL
class School(models.Model):
    """We will use this module to get school of our clients."""
    Status = [
        ["ACTIVE", "ACTIVE"],
        ["DELETED", "DELETED"],
        ["INACTIVE","INACTIVE"]
    ]
    name = models.CharField(max_length=200)
    code = models.PositiveBigIntegerField(null=True,blank=True)
    address = models.ForeignKey("LocationSmall",on_delete=models.CASCADE,null=True,blank=True)
    email = models.EmailField(null=True,blank=True)
    note = models.TextField(null=True,blank=True)
    zipcode = models.IntegerField(null=True,blank=True)
    city = models.CharField(max_length=200,null=True,blank=True)
    state = models.CharField(max_length=200,null=True,blank=True)
    status = models.CharField(choices=Status,default="INACTIVE",max_length=100)
#CLASS
class Class(Extra):
    """
    We will use this model to store data of CR or driving school's class or classroom
    """
    Status = [
        ["ACTIVE", "ACTIVE"],
        ["DELETED", "DELETED"],
        ["INACTIVE","INACTIVE"]
    ]
    date = models.DateField(default="1999/01/01",blank=True,null=True)
    location = models.ForeignKey("Location", on_delete=models.CASCADE)
    class_id = models.IntegerField(default=0,auto_created=True)
    start_date = models.DateField(default="1999/01/01",help_text="MM/DD/YYYY",blank=True,null=True)
    end_Data = models.DateField(default="1999/01/01",help_text="MM/DD/YYYY")
    zoom = models.TextField(blank=True,null=True),
    status = models.CharField(choices=Status, max_length=40, default="ACTIVE")
    details = models.TextField(blank=True,null=True)
    note = models.TextField(blank=True,null=True)
    day = models.ManyToManyField("scheduling.TimeRange",related_name="day_class")
    teacher = models.ForeignKey("Users.Instructor", on_delete=models.CASCADE,null=True,blank=True)





class LocationSmall(models.Model):
    """There we are storing real location with name and address"""
    name = models.CharField(max_length=200)
    address = models.TextField()
    note = models.TextField(blank=True)

# VEHICLE
class Vehicle(models.Model):
    """Here store vehicles of school."""
    Status = [
        ["ACTIVE", "ACTIVE"],
        ["DELETED", "DELETED"],
        ["INACTIVE", "INACTIVE"]
    ]
    Type = [
        ["BUS","BUS"],
        ["CAR","CAR"],
        ["MOTORCYCLE","MOTORCYCLE"],
        ["SCHOOL BUS","SCHOOL BUS"],
        ["TANKER","TANKER"],
        ["TRACTOR TRAILER","TRACTOR TRAILER"],
        ["TRUCK","TRUCK"]
    ]
    name = models.CharField(max_length=200)
    status = models.CharField(choices=Status,default="INACTIVE",max_length=100)
    type = models.CharField(choices=Type,max_length=100)
    location = models.ForeignKey("Location",on_delete=models.DO_NOTHING)
    number = models.CharField(max_length=100)
    make = models.CharField(max_length=150)
    plate = models.CharField(max_length=100)
    has_color = models.BooleanField(default=False)
    color = ColorField(default='#FF0000',blank=True)
    note = models.TextField(blank=True,null=True)
    asr_esn_id = models.TextField()
    odometer = models.PositiveIntegerField(blank=True,null=True)
    initial_mileage = models.IntegerField(blank=True,null=True)
    image = models.ImageField(storage="image/vehicles",blank=True,null=True)

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
