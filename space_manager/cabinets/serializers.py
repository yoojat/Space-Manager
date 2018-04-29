from rest_framework import serializers
from space_manager.branches import serializers as branch_serializers
from . import models
from space_manager.branches import models as branch_models


class BriefCabinetSetSerializer(serializers.ModelSerializer):
    branch = branch_serializers.BranchForMembershipSerializer()

    class Meta:
        model = models.CabinetSet
        fields = ('branch', )


class CabinetMembershipSerializer(serializers.ModelSerializer):

    cabinet_set = BriefCabinetSetSerializer()

    class Meta:
        model = models.Cabinet
        fields = ('cabinet_number', 'cabinet_set')


class UsecabSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    end_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    cabinet = CabinetMembershipSerializer()

    class Meta:
        model = models.UseCabinet
        fields = (
            'cabinet',
            'payment',
            'user',
            'start_date',
            'end_date',
            'is_usable',
            'is_clean',
            'id',
        )


class CabinetSerializerForSelect(serializers.ModelSerializer):
    class Meta:
        model = models.Cabinet
        fields = (
            'cabinet_number',
            'xpos',
            'ypos',
            'id',
            'is_available',
        )


class CabinetSetDetailSerializer(serializers.ModelSerializer):

    cabinets = CabinetSerializerForSelect(many=True)

    class Meta:
        model = models.CabinetSet
        fields = ('desc', 'id', 'horizontal_num', 'vertical_num', 'cabinets')


class CabinetSetSerializer(serializers.ModelSerializer):
    # cabinets = CabinetSerializerForSelect(many=True)

    class Meta:
        model = models.CabinetSet
        fields = ('width', 'height', 'xpos', 'ypos', 'order', 'desc', 'branch',
                  'id', 'horizontal_num', 'vertical_num')


class BranchCabinetSetsSerializer(serializers.ModelSerializer):
    cabinet_sets = CabinetSetSerializer(many=True)

    class Meta:
        model = branch_models.Branch
        fields = ('lounge_img_cabinet', 'cabinet_sets', 'branch_name', 'id')


class InputCabinetSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CabinetSet
        fields = (
            'width',
            'height',
            'order',
            'desc',
        )


class InputCabinetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Cabinet
        fields = (
            'cabinet_number',
            'cabinet_set',
            'xpos',
            'ypos',
        )


class UsecabSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    end_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    cabinet = CabinetMembershipSerializer()

    class Meta:
        model = models.UseCabinet
        fields = (
            'cabinet',
            'payment',
            'user',
            'start_date',
            'end_date',
            'is_usable',
            'is_clean',
            'id',
        )


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CabinetHistory
        fields = (
            'user',
            'cabinet',
            'start_date',
            'end_date',
            'cabinet_action',
        )


class InputCabLockSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CabinetLock
        fields = (
            'lock_number',
            'lock_password',
            'cabinet',
        )


class CabLockSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CabinetLock
        fields = (
            'branch',
            'lock_number',
            'lock_password',
            'cabinet',
        )