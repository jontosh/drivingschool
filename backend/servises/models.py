from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
class AddOn(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name
class Services(models.Model):
    OE = [
        ["NO CONTRACT NEEDED", "NO CONTRACT NEEDED"],
        ["TEEN", "TEEN"],
        ["ADULT", "ADULT"],
        ["KNOWLEDGE TEST(KT)", "KNOWLEDGE TEST(KT)"],
        ["ROAD TEST(RT)", "ROAD TEST(RT)"],
        ["UPLOAD DOCUMENTS", "UPLOAD DOCUMENTS"],
    ]

    STATUS = [
        ["ACTIVE", "ACTIVE"],
        ["DELETED", "DELETED"],
        ["INACTIVE", "INACTIVE"],
        ["PENDING", "PENDING"]
    ]
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200)
    status = models.CharField(choices=STATUS,max_length=50, default="INACTIVE")
    locations = models.ManyToManyField("location.Location",related_name="location_services")
    items = models.ManyToManyField("Component",related_name="component_services")
    taxable = models.BooleanField(default=False)
    price = models.DecimalField(decimal_places=2,default=0.00,max_digits=15)
    web_name = models.CharField(max_length=200)
    web_description = models.TextField(blank=True,null=True)
    enrolment_email = models.TextField(help_text="Here you have to write email that will go every "
                                                  "member registered to this service",blank=True,null=True)
    purchase = models.BooleanField(default=False)
    portal_purchase = models.BooleanField(default=False)
    add_ons = models.ManyToManyField("AddOn",related_name="addons")
    discount = models.ManyToManyField("Discount",related_name="service_discount")
    oe = models.CharField(choices=OE,max_length=50,default="NO CONTRACT NEEDED", help_text="Associate Contract From OE")
    notes = models.TextField(blank=True,null=True)

class Component(models.Model):
    """
    This code defines a Django model named Component that represents a course or program offered by a driving school or similar organization.
    """
    STATUS = [
        ["ACTIVE", "ACTIVE"],
        ["DELETED", "DELETED"],
        ["INACTIVE", "INACTIVE"],
        ["PENDING", "PENDING"]
    ]
    TYPE = [
        ["BTW", "BTW"],
        ["CR", "CR"],
        ["WEB", "WEB"],

    ]
    BTW_TYPE= [
        ["ADULT BTW","ADULT BTW"],
        ["CORP BTW","CORP BTW"],
        ["DEFENSIVE BTW","DEFENSIVE BTW"],
        ["DRIVING LESSON","DRIVING LESSON"],
        ["FORFEIT BTW","FORFEIT BTW"],
        ["RANGE","RANGE"],
        ["ROAD TEST","ROAD TEST"],
        ["SIMULATOR","SIMULATOR"],
        ["TEEN BTW","TEEN BTW"],
    ]
    WEB_TYPE=[
        ["EZ DRIVE","EZ DRIVE"],
        ["OTHER ONLINE COURSE","OTHER ONLINE COURSE"],
        ["SAFEWAY LMS","SAFEWAY LMS"],
    ]
    WEEK = [
        ["MON","MON"],
        ["TUE","TUE"],
        ["WED","WED"],
        ["THU","THU"],
        ["FRI","FRI"],
        ["SAT","SAT"],
        ["SUN","SUN"],
    ]
    name = models.CharField(max_length=150)
    code = models.CharField(max_length=150,db_index=True)
    status = models.CharField(max_length=50, choices=STATUS,default="INACTIVE")
    public_name = models.CharField(max_length=150, verbose_name="Public Name")
    type_component = models.CharField(choices=TYPE,max_length=50,default="BTW")
    subtype_btw = models.CharField(choices=BTW_TYPE,max_length=50,blank=True,null=True)
    subtype_web = models.CharField(choices=WEB_TYPE,max_length=50,blank=True,null=True)
    driving_hours = models.TimeField()
    enrolment_size= models.IntegerField(default=0,blank=True,null=True)
    make_up_size = models.IntegerField(default=0,blank=True,null=True)
    web_stu_enrolment = models.BooleanField(help_text="Website/Student Portal Enrollment",blank=True,null=True)
    location = models.ForeignKey("location.Location",on_delete=models.CASCADE)
    days = models.CharField(choices=WEEK,max_length=10,default="MON",blank=True,null=True)
    number_sessions = models.IntegerField(default=0,blank=True,null=True)
    sessions_day = models.IntegerField(default=0,blank=True,null=True)
    session_duration = models.TimeField(blank=True,null=True)
    start_time = models.TimeField(blank=True,null=True)
    end_time = models.TimeField(blank=True,null=True)

class Fee(models.Model):
    """
    Represents a fee that customers should pay.
    """
    STATUS = [
        ["ACTIVE","ACTIVE"],
        ["DELETED","DELETED"],
        ["INACTIVE","INACTIVE"],
        ["PENDING","PENDING"]
    ]
    name = models.CharField(max_length=150)
    status = models.CharField(choices=STATUS, max_length=50,default="INACTIVE")
    amount = models.IntegerField(default=0)
    notes = models.TextField(blank=True,null=True)

class Discount(models.Model):
    """
    Represents a discount that can be applied to services, classes, or locations.
    """
    STATUS = [
        ["ACTIVE", "ACTIVE"],
        ["DELETED", "DELETED"],
        ["INACTIVE", "INACTIVE"],
        ["PENDING", "PENDING"]
    ]
    name = models.CharField(max_length=200)
    status = models.CharField(choices=STATUS,default="INACTIVE", max_length=50)
    code = models.CharField(max_length=150,db_index=True)
    amount = models.IntegerField(default=0)
    notes = models.TextField(blank=True,null=True)
    services = models.ManyToManyField("Services",related_name="Discount_services")
    classes = models.ManyToManyField("location.Class",related_name="Discount_classes")
    locations = models.ManyToManyField("location.Location",related_name="Discount_locations")
    expiration_data = models.DateField(default="1999/01/01",)



@receiver(post_save, sender=Services)
@receiver(post_save, sender=Component)
@receiver(post_save, sender=Fee)
def create_addon_on_service_save(sender, instance, created, **kwargs):
    if created:
        addon_name = f"{sender._meta.model_name} - {instance.name}"
        addon, created = AddOn.objects.get_or_create(name=addon_name)
