from rest_framework import serializers
from space_manager.branches import serializers as branch_serializers
from . import models
from space_manager.branches import models as branch_models
from space_manager.users import serializers as user_serializers


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


class CabinetSerializerForSelect(serializers.ModelSerializer):
    cabinet_set = BriefCabinetSetSerializer()
    user = user_serializers.UserSerializer()

    class Meta:
        model = models.Cabinet
        fields = ('cabinet_number', 'xpos', 'ypos', 'id', 'start_date',
                  'cabinet_set', 'end_date', 'is_usable', 'is_clean', 'user')


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