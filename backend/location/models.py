from django.db import models
from colorfield.fields import ColorField
# LOCATION
class Location(models.Model):
    """
    This is module to make website, to create a branch of driving school or school itself.
    """
    Status = [
        ["ACTIVE", "ACTIVE"],
        ["DELETED", "DELETED"],
        ["INACTIVE","INACTIVE"]
    ]
    Type = [
        [" Main office only",0],
        ['Main office with classroom',1],
        ["Class Room",2],
        [" Other (Satellite Office Only)",3],
        ["Other Classroom (Satellite Office with Classroom)",4],
        ["Range",5]
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
    location_manager = models.CharField(max_length=200)
    pick_up = models.ForeignKey("LocationSmall",on_delete=models.CASCADE,related_name="pickUp")
    drop_off = models.ForeignKey("LocationSmall",on_delete=models.CASCADE,related_name="dropOff")
    county = models.CharField(max_length=200)
    phone_main = models.CharField(max_length=100)
    fax = models.CharField(max_length=100)
    other = models.CharField(max_length=100)
    location_note = models.TextField()
    has_color = models.BooleanField(default=False)
    color = ColorField(default='#FF0000')
    has_distance_based_scheduling = models.BooleanField(default=False)
    distance_based_scheduling = models.IntegerField(default=0)
    provider_location_id = models.CharField(blank=True,null=True,max_length=200)
    send_drive_available_email_on_appointment_cancellation= models.BooleanField(default=False)

# SCHOOL
class School(models.Model):
    """We will use this module to get school of our clients."""
    Status = [
        ["ACTIVE", "ACTIVE"],
        ["DELETED", "DELETED"],
        ["INACTIVE","INACTIVE"]
    ]
    name = models.CharField(max_length=200)
    code = models.PositiveBigIntegerField()
    address = models.ForeignKey("LocationSmall",on_delete=models.CASCADE)
    email = models.EmailField()
    note = models.TextField()
    zipcode = models.IntegerField()
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    status = models.CharField(choices=Status,default="INACTIVE",max_length=100)
#CLASS
class Class(models.Model):
    Status = [
        ["ACTIVE", "ACTIVE"],
        ["DELETED", "DELETED"],
        ["INACTIVE","INACTIVE"]
    ]
    date = models.DateField(default="1999/01/01",blank=True,null=True)
    location = models.ForeignKey("Location", on_delete=models.CASCADE)
    class_id = models.IntegerField(default=0,auto_created=True)
    start_date = models.DateField(default="1999/01/01",help_text="MM/DD/YYYY",blank=True,null=True)
    end_Data = models.DateField(default="1999/01/01",help_text="MM?DD?YYYY")
    zoom = models.TextField(blank=True,null=True),
    status = models.CharField(choices=Status, max_length=40, default="ACTIVE")
    details = models.TextField(blank=True,null=True)
    note = models.TextField(blank=True,null=True)
    day = models.ManyToManyField("Users.TimeRange",related_name="day_class")
    teacher = models.ForeignKey("Users.Instructor", on_delete=models.CASCADE,null=True,blank=True)





class LocationSmall(models.Model):
    """There we are storing real location with name and address"""
    name = models.CharField(max_length=200)
    address = models.TextField()
    note = models.TextField()

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
    color = ColorField(default='#FF0000')
    note = models.TextField()
    asr_esn_id = models.TextField()
    odometer = models.PositiveIntegerField()
    initial_mileage = models.IntegerField()
    image = models.ImageField(storage="image/vehicles")

