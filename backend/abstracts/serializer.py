# serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['username'] = user.username
        # Add more custom claims as needed

        return token

    def validate(self, attrs):
        print(attrs)
        data = super().validate(attrs)
        try:
            uid = self.user.type.id
            admin_portal = self.user.type._admin_portal
            student_portal = self.user.type._student_portal
            super_user_portal = self.user.type._super_user_portal
        except:
            uid = "null"
            admin_portal = False
            student_portal = False
            super_user_portal = False

        data.update({
            'user': {
                'id': self.user.id,
                'username': self.user.username,
                'email': self.user.email,
                "usertype":uid,
                "admin_portal":admin_portal,
                    "student_portal":student_portal,
                "super_user_portal":super_user_portal,
            }
        })
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer