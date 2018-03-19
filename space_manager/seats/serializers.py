from rest_framework import serializers
from . import models
import json


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Log
        fields = (
            'action',
            'user',
            'seat',
            'seat_image',
        )


class SeatSerializer(serializers.ModelSerializer):

    logs = LogSerializer(many=True)

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

    now_using = serializers.SerializerMethodField()

    class Meta:
        model = models.Seat
        fields = (
            'id',
            'seat_number',
            'left',
            'top',
            'rotate',
            'usable',
            'discard',
            'now_using',
        )

    def get_now_using(self, obj):

        assign_action = models.Action.objects.get(en_substance='allocation')

        try:
            latest_log = models.Log.objects.filter(
                seat=obj).order_by('-created_at')[:1]
            if latest_log:
                if latest_log[0].action == assign_action:
                    return True
                else:
                    return False
            else:
                return False

        except models.Log.DoesNotExist:
            return False


class ChangeLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Log
        fields = (
            'user',
            'seat',
        )
