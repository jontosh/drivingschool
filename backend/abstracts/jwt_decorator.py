from functools import wraps
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.http import JsonResponse

def jwt_authentication_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        try:
            # Try to authenticate the user
            token = request.COOKIES.get('access_token')
            validated_token = JWTAuthentication( ).get_validated_token(token)
            user = JWTAuthentication( ).get_user(validated_token)


            if user is not None:
                request.user = user
            else:
                return JsonResponse({'detail': 'Authentication credentials were not provided.'}, status=401)
        except AuthenticationFailed:
            return JsonResponse({'detail': 'Invalid token.'}, status=401)

        return view_func(request, *args, **kwargs)

    return _wrapped_view
