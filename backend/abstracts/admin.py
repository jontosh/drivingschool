# In admin.py

from django.contrib import admin
from django.template.response import TemplateResponse
from django.urls import get_resolver


class URLListView(admin.ModelAdmin):
    def get_urls(self):
        # Get the root URL resolver
        resolver = get_resolver()
        urls = self._get_urls(resolver)
        return urls

    def _get_urls(self, resolver, parent_pattern=None):
        url_patterns = []

        # Loop over the URL patterns in this resolver
        for url_pattern in resolver.url_patterns:
            # Check if it's a pattern object
            if hasattr(url_pattern, 'pattern'):
                url_patterns.append(url_pattern.pattern)
            else:
                # If it's a resolver, recurse to get its patterns
                url_patterns += self._get_urls(url_pattern, parent_pattern=url_pattern.pattern)

        return url_patterns

    def changelist_view(self, request, extra_context=None):
        # Get all the URL patterns
        url_patterns = self.get_urls()

        # Render the custom template with the URL patterns
        return TemplateResponse(
            request,
            "login.html",
            {"url_patterns": url_patterns}
        )
# admin.site.register(URLListView)