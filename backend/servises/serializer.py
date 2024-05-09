from rest_framework import serializers
from .models import AddOn ,Services,Component,Fee,Discount

class AddOnSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddOn
        fields = "__all__"  # Include all fields for now (consider selective inclusion later)
class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = "__all__"
class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = "__all__"
class FeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fee
        fields = "__all__"
class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = "__all__"