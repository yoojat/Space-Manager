from rest_framework import serializers
from . import models


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Seat
        fields = (
            'seat_number',
            'left',
            'top',
            'rotate',
            'usable',
            'discard',
            'room',
            'branch',
        )


class InputSeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Seat
        fields = (
            'seat_number',
            'left',
            'top',
            'rotate',
            'room',
            'branch',
        )


class ShowSeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Seat
        fields = (
            'seat_number',
            'left',
            'top',
            'rotate',
            'usable',
            'discard',
        )


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Log
        fields = (
            'action',
            'user',
            'seat',
            'seat_image',
        )


class ChangeLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Log
        fields = (
            'user',
            'seat',
        )
