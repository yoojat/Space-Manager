from rest_framework import serializers
from . import models
from space_manager.membership import serializers as membership_serializers
from space_manager.seats import serializers as seat_serializers


class BranchSerializer(serializers.ModelSerializer):

    seats = seat_serializers.SeatSerializer(many=True)

    class Meta:
        model = models.Branch
        fields = (
            'id',
            'branch_num',
            'region',
            'branch_name',
            'address',
            'detail_address',
            'lat',
            'lng',
            'lounge_img',
            'seats',
        )


class BriefBranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Branch
        fields = (
            'id',
            'branch_num',
            'region',
            'branch_name',
            'address',
            'detail_address',
            'lat',
            'lng',
            'lounge_img',
        )


class BranchConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BranchConfig
        fields = '__all__'


class BranchForMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Branch
        fields = (
            'id',
            'branch_name',
            'branch_num',
            'address',
        )
