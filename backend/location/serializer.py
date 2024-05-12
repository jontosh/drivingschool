from rest_framework import serializers
from .models import School ,Vehicle,LocationSmall,Class,Location,HowDidYouHearUs

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = "__all__"  # Include all fields for now (consider selective inclusion later)
class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = "__all__"
class LocationSmallSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationSmall
        fields = "__all__"
class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = "__all__"
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"
class HowDidYouHearUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HowDidYouHearUs
        fields = "__all__"