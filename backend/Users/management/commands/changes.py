from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.hashers import make_password
from django_tenants.utils import schema_context
from mainadmin.models import CustomUser  # Adjust the import based on your actual model path

class Command(BaseCommand):
    help = 'Change a user\'s password to a specified hashed password in a specific schema'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str, help='Username of the user whose password will be changed')
        parser.add_argument('schema_name', type=str, help='Schema name where the user resides')

    def handle(self, *args, **kwargs):
        username = kwargs['username']
        schema_name = kwargs['schema_name']
        new_password = 'sarr43210'

        try:
            with schema_context(schema_name):
                try:
                    user = CustomUser.objects.get(username=username)
                    user.password = make_password(new_password)
                    user.save()
                    self.stdout.write(self.style.SUCCESS(f'Successfully changed password for user "{username}" in schema "{schema_name}"'))
                except CustomUser.DoesNotExist:
                    raise CommandError(f'User "{username}" does not exist in schema "{schema_name}"')
        except Exception as e:
            raise CommandError(f'Error accessing schema "{schema_name}": {str(e)}')
