from rest_framework import serializers
from . import models
import json
from datetime import datetime, timedelta


class SeatImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SeatImage()
        fields = ('file', 'gender')


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Log
        fields = (
            'action',
            'user',
            'seat',
            'reg_datetime',
        )


class SeatBriefSerializer(serializers.ModelSerializer):
    # logs = LogSerializer(many=True)

    now_using = serializers.SerializerMethodField()

    class Meta:
        model = models.Seat
        fields = (
            'id',
            'left',
            'top',
            'usable',
            'discard',
            'now_user',
            'end_datetime',
            'now_using',
        )

    def get_now_using(self, obj):
        now = datetime.now()
        if obj.end_datetime is None:
            return False
        else:
            return obj.end_datetime > now


# class SeatBriefSerializer(serializers.ModelSerializer):
#     # logs = LogSerializer(many=True)
#     seat_image = SeatImageSerializer()

#     class Meta:
#         model = models.Seat
#         fields = ('id', 'left', 'top', 'usable', 'discard', 'for_who',
#                   'seat_number', 'seat_image')

# def get_now_using(self, obj):

#     assign_action = models.Action.objects.get(en_substance='allocation')

#     try:
#         latest_log = models.Log.objects.filter(
#             seat=obj).order_by('-created_at')[:1]
#         if latest_log:
#             if latest_log[0].action == assign_action:
#                 return True
#             else:
#                 return False
#         else:
#             return False

#     except models.Log.DoesNotExist:
#         return False


class SeatSerializer(serializers.ModelSerializer):

    logs = LogSerializer(many=True)

    class Meta:
        model = models.Seat
        fields = ('seat_number', 'left', 'top', 'rotate', 'usable', 'discard',
                  'room', 'branch', 'logs')


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
    seat_image = SeatImageSerializer()
    now_using = serializers.SerializerMethodField()

    class Meta:
        model = models.Seat
        fields = ('id', 'seat_number', 'left', 'top', 'rotate', 'usable',
                  'discard', 'seat_image', 'now_user', 'now_using')

    def get_now_using(self, obj):
        now = datetime.now()
        if obj.end_datetime is None:
            return False
        else:
            return obj.end_datetime > now

    # def get_now_using(self, obj):

    #     assign_action = models.Action.objects.get(en_substance='allocation')

    #     try:
    #         latest_log = models.Log.objects.filter(
    #             seat=obj).order_by('-created_at')[:1]
    #         if latest_log:
    #             if latest_log[0].action == assign_action:
    #                 return True
    #             else:
    #                 return False
    #         else:
    #             return False

    #     except models.Log.DoesNotExist:
    #         return False

    # def get_image_url(self, obj):

    #     assign_action = models.Action.objects.get(en_substance='allocation')

    #     try:
    #         latest_log = models.Log.objects.filter(
    #             seat=obj).order_by('-created_at')[:1]

    #         if latest_log:
    #             if latest_log[0].action == assign_action:
    #                 return latest_log[0].seat_image.file.url

    #             else:
    #                 return None
    #         else:
    #             return None

    #     except models.Log.DoesNotExist:
    #         return None


class ChangeLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Log
        fields = (
            'user',
            'seat',
        )
