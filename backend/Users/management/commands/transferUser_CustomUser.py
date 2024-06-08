from django.core.management.base import BaseCommand
from django_tenants.utils import schema_context
from Users.models import User
from mainadmin.models import CustomUser, UserType, Rights , Fields
from django.contrib.auth.hashers import make_password

class Command(BaseCommand):
    help = 'Transfer data from User to CustomUser within a specific schema'

    def handle(self, *args, **kwargs):
        schema_name = 'drivingschool'
        with schema_context(schema_name):
            users = User.objects.all()
            for user in users:
                if user.username=="ali":
                    continue
                new_user,get_new_user = CustomUser.objects.get_or_create(
                    uuid = user.id,
                    status = user.status,
                    address = user.address,
                    first_name = user.first_name,
                    mid_name = user.mid_name,
                    last_name = user.last_name,
                    city = user.city,
                    state = user.state,
                    zip = user.zip,
                    email = user.email,
                    code = user.code,
                    home_phone = user.home_phone,
                    cell_phone = user.cell_phone,
                    birth = user.birth,
                    username = user.username,
                )
                usertype,get_type = UserType.objects.get_or_create(id=user.type.id,name=user.type.name)
                for i in user.type.rights.all():
                    fields,get_field = Fields.objects.get_or_create(
                        id = i.field.id,
                        app_name = i.field.app_name,
                        model_name = i.field.model_name,
                        field_name = i.field.field_name,
                    )
                    fields.save( )
                    rights, get_rights = Rights.objects.get_or_create(
                        id=i.id,
                        has_add_new = i.has_add_new,
                        has_edit_page = i.has_edit_page,
                        has_view_page = i.has_view_page,
                        has_delete_record = i.has_delete_record,
                        has_read_own = i.has_read_own,
                        has_read_all = i.has_read_all,
                        field = fields
                    )
                    rights.save()
                    usertype.rights.add(rights)
                usertype.save()
                new_user.type = usertype
                new_user.set_password(user.password)
                new_user.save()
                self.stdout.write(self.style.WARNING(f'User {user.username} already exists in CustomUser'))
