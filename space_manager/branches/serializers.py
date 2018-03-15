from rest_framework import serializers
from . import models
from space_manager.membership import serializers as membership_serializers
from space_manager.seats import serializers as seat_serializers
from space_manager.rooms import serializers as rooms_serializers
from space_manager.membership import models as membership_models
from datetime import datetime, timedelta


class BranchSerializerForIp(serializers.ModelSerializer):
    is_enrolled = serializers.SerializerMethodField()
    rooms = rooms_serializers.RoomSerializer(many=True)

    class Meta:
        model = models.Branch
        fields = ('id', 'branch_num', 'region', 'branch_name', 'address',
                  'detail_address', 'lat', 'lng', 'lounge_img', 'is_enrolled',
                  'rooms')

    def get_is_enrolled(self, obj):
        now = datetime.today()
        if 'request' in self.context:
            request = self.context['request']
            try:
                membership_models.Membership.objects.get(
                    user__id=request.user.id,
                    end_date__gte=now,
                    is_usable=True)
                return True

            except membership_models.Membership.DoesNotExist:
                return False

        return False


class BranchIpSerializer(serializers.ModelSerializer):

    branch = BranchSerializerForIp()

    class Meta:
        model = models.BranchIp
        fields = (
            'branch',
            'ip',
        )


class BranchSerializer(serializers.ModelSerializer):

    seats = seat_serializers.SeatSerializer(many=True)
    ips = BranchIpSerializer(many=True)
    is_enrolled = serializers.SerializerMethodField()

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
            'is_enrolled',
            'ips',
        )

    def get_is_enrolled(self, obj):
        now = datetime.today()
        if 'request' in self.context:
            request = self.context['request']
            try:
                membership_models.Membership.objects.get(
                    user__id=request.user.id,
                    end_date__gte=now,
                    is_usable=True)
                return True

            except membership_models.Membership.DoesNotExist:
                return False

        return False


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
