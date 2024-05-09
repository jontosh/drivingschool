from django.utils import timezone
from interaction.models import Logs
from django_tenants.utils import remove_www
class DRFLoggingMiddleware:
    """
    Custom middleware to capture and save DRF request/response logs.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = timezone.now()
        response = self.get_response(request)
        processing_time = (timezone.now() - start_time).total_seconds()
        host = remove_www(request.get_host().split(":")[0])
        data = {
            'timestamp': start_time.isoformat(),
            'processing_time': processing_time,
            'method': request.method,
            'ulr_name': request.path,
            'status_code': response.status_code,
            'ip_address': request.META.get('REMOTE_ADDR'),
            "full_url":request.META.get("HTTP_REFERER"),
            "host":host
        }
        exclude = ["admin"]
        if host !="localhost" or str(data["ulr_name"]).split("/")[1] not in exclude:
            Logs.objects.get_or_create(
                time =start_time,
                action = request.path,
                method = request.method,
                ip_address = request.META.get('REMOTE_ADDR'),
                code =response.status_code,
                processing_time = processing_time,
                full_url = request.META.get("HTTP_REFERER"),
                host = host
            )



        return response
