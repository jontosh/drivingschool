from django.core.management.base import BaseCommand
from mainadmin.models import CustomUser
from django.contrib.auth.hashers import make_password
from django_tenants.utils import schema_context
class Command(BaseCommand):
    help = 'Convert all user passwords to hashed format'

    def handle(self, *args, **options):
        with schema_context('drivingschool'):

            users = CustomUser.objects.all()
            for user in users:
                if not user.password.startswith('pbkdf2_'):  # Check if password is already hashed
                    self.stdout.write(self.style.NOTICE(f'Hashing password for user: {user.username}'))
                    user.password = make_password(user.password)
                    user.save()

            self.stdout.write(self.style.SUCCESS('Successfully hashed all user passwords'))
