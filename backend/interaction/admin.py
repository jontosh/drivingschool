from django.contrib import admin
from django.contrib.admin.models import LogEntry, DELETION,ADDITION,CHANGE
from django.utils.html import escape
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Logs,LatestNews,Tasks
@admin.register(LogEntry)
class LogEntryAdmin(admin.ModelAdmin):
    # date_hierarchy = 'action_time'

    list_display = [
        'action_time',
        'user',
        'content_type',
        'object_link',
        'action_flag',
    ]



    def has_change_permission(self, request, obj=None):
        return False


    def has_view_permission(self, request, obj=None):
        return request.user.is_superuser

    def object_link(self, obj):
        if obj.action_flag == DELETION:
            link = escape(obj.object_repr)
        else:
            ct = obj.content_type
            link = '<a href="%s">%s</a>' % (
                reverse('admin:%s_%s_change' % (ct.app_label, ct.model), args=[obj.object_id]),
                escape(obj.object_repr),
            )
        return mark_safe(link)
    object_link.admin_order_field = "object_repr"
    object_link.short_description = "object"
class ContentTypeAdmin(admin.ModelAdmin):
  readonly_fields = ["id", "app_label", "model", "logentry", "permission", "messageitems"]
admin.site.register(Logs)
admin.site.register(LatestNews)
admin.site.register(Tasks)