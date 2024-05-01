from django.db import models

# Create your models here.
class Status(models.Model):
    Status = [
        ["ACTIVE", "ACTIVE"],
        ["DELETED", "DELETED"],
        ["INACTIVE", "INACTIVE"]
    ]
    status = models.CharField(choices=Status, default="INACTIVE", max_length=100)

    class Meta:
        abstract = True
    def __str__(self):
        return self.status

class Extra(models.Model):
    extra = models.JSONField(blank=True)

    class Meta:
        abstract = True
    def __str__(self):
        return self.extra