from django.http import HttpResponseRedirect
from django.shortcuts import render,redirect
from .jwt_decorator import jwt_authentication_required
from django.views import View
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
@jwt_authentication_required
def vie(requests):
    return render(requests,"Doccumentation.html")


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
class LoginView(View):
    def get(self, request):
        return render(request, 'login.html')

    def post(self, request, *args, **kwargs):
        email = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            token_view = MyTokenObtainPairView.as_view( )
            response= token_view(request._request)
            if response.status_code == 200:
                return HttpResponseRedirect('documentation')
        else:
            return Response({ "error": "Invalid credentials" }, status=status.HTTP_400_BAD_REQUEST)