from django.db import models

# Create your models here.
class Location(models.Model):
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
    status = models.CharField(choices=Status)
    type = models.CharField(choices=Type)
    address = models.TextField()
    city = models.CharField(max_length=200)
    zip = models.CharField(max_length=50)
    location_manager = models.CharField(max_length=200)
    pickup = models.ForeignKey("LocationSmall",on_delete=models.CASCADE())
    dropOff = models.ForeignKey("LocationSmall",on_delete=models.CASCADE())
    county = models.CharField(max_length=200)
    phone_main = models.CharField(max_length=100)
    fax = models.CharField(max_length=100)
    other = models.CharField(max_length=100)
    location_note = models.TextField()
    has_color = models.BooleanField(default=False)
    color = models.IntegerField()
    has_distance_based_scheduling = models.BooleanField(default=False)
    distance_based_scheduling = models.IntegerField(default=0)
    provider_location_id = models.CharField(blank=True,max_length=200)
    send_drive_available_email_on_appointment_cancellation= models.BooleanField(default=False)

class LocationSmall(models.Model):
    name = models.CharField(max_length=200)
    adress = models.TextField()
    note = models.TextField()


