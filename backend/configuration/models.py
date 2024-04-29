from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
# Create your models here.
class CompanyInfo(models.Model):
    id = models.UUIDField(auto_created=True,primary_key=True)
    name = models.CharField(max_length=200)
    owner_name = models.CharField(max_length=200)
    address = models.TextField()
    city = models.CharField(max_length=200, blank=True, null=True)
    zip = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField()
    cell_phone = PhoneNumberField()
    fax = models.TextField(blank=True)
    extra = models.JSONField(blank=True)
    url = models.TextField()
    notes = models.TextField(blank=True)

class WebContent(models.Model):
    title = models.CharField(max_length=200)
    rest_url = models.URLField()
    content = models.TextField(blank=True)
    note = models.TextField(blank=True)
    is_active = models.BooleanField(default=False)
    def __str__(self):
        return self.title

class ZipCode(models.Model):
    zip_code = models.IntegerField(blank=True)
    def __str__(self):
        return self.zip_code

class StorageManagement(models.Model):
    id = models.UUIDField(primary_key=True)
    last_datetime=models.DateField(auto_now_add=True)
    used = models.IntegerField(default=0)
    upload_month = models.IntegerField(default=0)
    download_month = models.IntegerField(default=0)
    number_files = models.IntegerField(default=0)
    storage = models.IntegerField(default=0)
    unit = models.CharField(max_length=10)
    def __str__(self):
        return f"{self.storage}{self.unit}"

class EmergencyData(models.Model):
    name = models.CharField(max_length=200)
    data = models.JSONField()
    note = models.TextField(blank=True)
    def __str__(self):
        return self.name


class MessageItems(models.Model):
    message = models.ForeignKey("Messages",on_delete=models.CASCADE)
    from_object_id = models.IntegerField()
    from_content_type = models.ForeignKey(
        ContentType,
        on_delete=models.PROTECT,
    )
    from_user = GenericForeignKey(
        'from_content_type',
        'from_object_id',
    )

class Messages(models.Model):
    STATUS = [
        ["SEEN", "SEEN"],
        ["DELETED", "DELETED"],
        ["UNREAD", "UNREAD"]
    ]
    student = models.ForeignKey("Users.Student",related_name="student_message",on_delete=models.CASCADE)
    datetime = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=STATUS,max_length=30,default="UNREAD")
    def add_item(self, user) -> 'MessageItems':
        from_content_type = ContentType.objects.get_for_model(user)
        return MessageItems.objects.create(
            message = self,
            from_content_type=from_content_type,
            from_object_id=user.pk,
        )

