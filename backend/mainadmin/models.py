from django.db import models
from django_tenants.models import TenantMixin, DomainMixin
from django.contrib.auth.models import AbstractUser,Group
import uuid
class Client(TenantMixin):
    name = models.CharField(max_length=100)
    created_on = models.DateField(auto_now_add=True)
    account_number = models.CharField(max_length=200, blank=True,null=True)


class Domain(DomainMixin):
    pass

class CustomUser(AbstractUser):
    STATUS = [
        ["ACTIVE", "ACTIVE"],
        ["DELETED", "DELETED"],
        ["PENDING", "PENDING"],
    ]
    id = models.UUIDField(primary_key=True, null=False, default=uuid.uuid4, editable=False)
    status = models.CharField(choices=STATUS, max_length=30, default="PENDING")
    address = models.TextField()
    first_name = models.CharField(max_length=200)
    mid_name = models.CharField(max_length=200, blank=True, null=True)
    last_name = models.CharField(max_length=200)
    city = models.CharField(max_length=200, blank=True, null=True)
    state = models.CharField(max_length=200, blank=True, null=True)
    zip = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField()
    code = models.CharField(max_length=150, blank=True, null=True)
    home_phone = models.CharField(blank=True,null=True,max_length=30)
    cell_phone = models.CharField(max_length=30)
    birth = models.DateField(default="1999-01-01", help_text="Data of birth")
    username = models.CharField(max_length=200, unique=True)
    password = models.CharField(max_length=200, blank=True, null=True)
    type = models.ForeignKey("UserType", on_delete=models.CASCADE,blank=True,null=True)
    # _is_active = models.BooleanField(default=False,blank=True)
    USERNAME_FIELD = 'username'
    class Meta:
        app_label = "mainadmin"
    def save(self, *args, **kwargs):
        if not self.id:
            self.id = uuid.uuid4()
        super().save(*args, **kwargs)
        default_group, created = Group.objects.get_or_create(name='DefaultGroup')
        if not self.groups.exists():
            self.groups.add(default_group)
    def __str__(self):
        return  self.username

class UserType(models.Model):
    name = models.CharField(max_length=100)
    # rights = models.ManyToManyField("Rights",related_name="user_rights")
    _admin_portal = models.BooleanField(default=False)
    _student_portal = models.BooleanField(default=False)
    _super_user_portal = models.BooleanField(default=False)
    def __str__(self):
        return self.name

class Rights(models.Model):
    has_add_new = models.BooleanField(default=False)
    has_edit_page = models.BooleanField(default=False)
    has_view_page = models.BooleanField(default=False)
    has_delete_record = models.BooleanField(default=False)
    has_read_own = models.BooleanField(default=False)
    has_read_all = models.BooleanField(default=False)
    field = models.ForeignKey("Fields",on_delete=models.CASCADE)

class Fields(models.Model):
    app_name = models.CharField(max_length=50)
    model_name = models.CharField(max_length=50,blank=True,null=True)
    field_name = models.CharField(max_length=50,blank=True,null=True)