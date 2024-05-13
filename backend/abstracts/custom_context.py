# In context_processors.py

from django.urls import get_resolver

def url_patterns_context(request):
    resolver = get_resolver().url_patterns
    url_patterns = _get_url_patterns(resolver)
    url_patterns =      [url.strip() for url in url_patterns if url.strip() and '<' not in url and '^' not in url and
                         'admin' not in url and 'auth' not in url   ]

    url_patterns = group_urls_by_root(url_patterns)
    return {'url_patterns': url_patterns}

def _get_url_patterns(urllist, parent_pattern=None):

    url_patterns = []
    for entry in urllist:
        if hasattr(entry, 'url_patterns'):
            url_patterns += _get_url_patterns(entry.url_patterns, parent_pattern=str(entry.pattern))
        else:
            url_patterns.append((parent_pattern or '') + str(entry.pattern))
    return url_patterns
def group_urls_by_root(urls):
    url_dict = {}

    for url in urls:
        root = url.split('/')[0]  # Get the root URL
        if root not in url_dict:
            url_dict[root] = []
        url_dict[root].append(url)

    return url_dict