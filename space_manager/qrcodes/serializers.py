from rest_framework import serializers
from . import models


class TempSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.QR
        fields = ('end_date', )


class CheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CheckInOut
        fields = ('end_date', )
