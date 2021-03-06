from rest_framework import serializers
from . import models
from space_manager.rooms import models as room_models
from space_manager.users import models as user_models
from space_manager.branches import models as branches_models

import json
from datetime import datetime, timedelta


class UserSerializerForSeatAdmin(serializers.ModelSerializer):
    class Meta:
        model = user_models.User
        fields = (
            'name',
            'username',
            'id',
        )


class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Action
        fields = '__all__'


class LogSerializerForAdmin(serializers.ModelSerializer):
    user = UserSerializerForSeatAdmin()
    action = ActionSerializer()

    class Meta:
        model = models.Log
        fields = (
            'id',
            'action',
            'user',
            'seat',
            'created_at',
        )


class SeatSerializerForAdmin(serializers.ModelSerializer):
    logs = LogSerializerForAdmin(many=True)
    now_using = serializers.SerializerMethodField()

    class Meta:
        model = models.Seat
        fields = ('id', 'seat_number', 'usable', 'discard', 'room', 'branch',
                  'now_user', 'end_datetime', 'logs', 'now_using')

    def get_now_using(self, obj):
        now = datetime.now()
        if obj.end_datetime is None:
            return False
        else:
            return obj.end_datetime > now


class SeatImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SeatImage()
        fields = ('file', 'gender')


class RoomTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = room_models.RoomType
        fields = ('id', 'en_substance', 'kr_substance')


class RoomSerializerForSeat(serializers.ModelSerializer):

    room_type = RoomTypeSerializer()

    class Meta:
        model = room_models.Room()
        fields = (
            'id',
            'room_number',
            'width',
            'height',
            'left',
            'top',
            'usable',
            'desk_size',
            'view_width',
            'view_height',
            'branch',
            'room_type',
        )


class BrancheSerializer(serializers.ModelSerializer):
    class Meta:
        model = branches_models.Branch()
        fields = '__all__'


class SeatSerializerForUser(serializers.ModelSerializer):

    room = RoomSerializerForSeat()
    branch = BrancheSerializer()

    class Meta:
        model = models.Seat
        fields = (
            'room',
            'seat_number',
            'branch',
            'now_user',
            'end_datetime',
        )


class LogSerializer(serializers.ModelSerializer):

    seat = SeatSerializerForUser()
    action = ActionSerializer()

    class Meta:
        model = models.Log
        fields = (
            'id',
            'action',
            'user',
            'seat',
            'created_at',
        )


class BriefRoomSeiralizer(serializers.ModelSerializer):
    class Meta:
        model = room_models.Room
        fields = ('room_number', 'id')


class DetailSeatSerializer(serializers.ModelSerializer):
    room = BriefRoomSeiralizer()

    class Meta:
        model = models.Seat
        fields = (
            'id',
            'seat_number',
            'room',
        )


class DetailLogSerializer(serializers.ModelSerializer):

    seat = DetailSeatSerializer()
    action = ActionSerializer()

    class Meta:
        model = models.Log
        fields = (
            'id',
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
            'xpos',
            'ypos',
            'usable',
            'discard',
            'now_user',
            'end_datetime',
            'now_using',
            'seat_number',
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
    room = BriefRoomSeiralizer()

    class Meta:
        model = models.Seat
        fields = (
            'seat_number',
            'xpos',
            'ypos',
            'rotate',
            'usable',
            'discard',
            'end_datetime',
            'room',
            'branch',
            'logs',
            'id',
        )


class InputSeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Seat
        fields = (
            'seat_number',
            'xpos',
            'ypos',
            'rotate',
            'room',
            'branch',
        )


class ShowSeatSerializer(serializers.ModelSerializer):
    seat_image = SeatImageSerializer()
    now_using = serializers.SerializerMethodField()

    class Meta:
        model = models.Seat
        fields = ('id', 'seat_number', 'xpos', 'ypos', 'rotate', 'usable',
                  'discard', 'seat_image', 'now_user', 'now_using',
                  'view_left', 'view_top', 'end_datetime')

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
