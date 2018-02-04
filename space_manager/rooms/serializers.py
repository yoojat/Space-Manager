from rest_framework import serializers
from . import models
from space_manager.branches import serializers as branch_serializers


class RoomTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.RoomType
        fields = (
            'id',
            'en_substance',
            'kr_substance'
        )


class RoomSerializer(serializers.ModelSerializer):

    # branch = branch_serializers.BranchSerializer()
    room_type = RoomTypeSerializer()

    class Meta:
        model = models.Room
        fields = (
            'branch',
            'room_number',
            'room_type',
            'width',
            'height',
            'left',
            'top',
            'usable',
        )


class InputRoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Room
        fields = (
            'branch',
            'room_number',
            'room_type',
            'width',
            'height',
            'left',
            'top',
        )
