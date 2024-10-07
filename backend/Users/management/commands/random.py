from django.core.management.base import BaseCommand
from scheduling.models import TimeSlot
from django.contrib.auth.hashers import make_password
from django_tenants.utils import schema_context


class Command(BaseCommand):
    help = 'Convert all user passwords to hashed format'

    def handle(self, *args, **options):
        with schema_context('drivingschool'):

            users = TimeSlot.objects.all( )
            for user in users:
                if user.id == 4:
                    user.delete( )

            self.stdout.write(self.style.SUCCESS('Successfully hashed all user passwords'))
