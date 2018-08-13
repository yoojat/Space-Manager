from rest_framework import serializers
from space_manager.branches import serializers as branch_serializers
from space_manager.cabinets import serializers as cabinet_serializers
from . import models
from space_manager.branches import models as branch_models
from space_manager.users import serializers as user_serializers


class BriefCabinetSetSerializer(serializers.ModelSerializer):
    branch = branch_serializers.BranchForMembershipSerializer()

    class Meta:
        model = models.CabinetSet
        fields = ('branch', )


class CabinetSerializerForSelect(serializers.ModelSerializer):
    cabinet_set = BriefCabinetSetSerializer()
    user = user_serializers.UserSerializer()

    class Meta:
        model = models.Cabinet
        fields = ('cabinet_number', 'xpos', 'ypos', 'id', 'start_date',
                  'cabinet_set', 'end_date', 'is_usable', 'is_clean', 'user')


class CabinetActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CabinetAction
        fields = '__all__'


class CabinetHistorySerializer(serializers.ModelSerializer):
    cabinet_action = CabinetActionSerializer()

    class Meta:
        model = models.CabinetHistory
        fied = (
            'cabinet',
            'start_date',
            'end_date',
            'cabinet_action',
        )


class CabinetMembershipSerializer(serializers.ModelSerializer):

    cabinet_set = BriefCabinetSetSerializer()

    class Meta:
        model = models.Cabinet
        fields = ('cabinet_number', 'cabinet_set')


class CabinetSetSerializer(serializers.ModelSerializer):
    # cabinets = CabinetSerializerForSelect(many=True)

    class Meta:
        model = models.CabinetSet
        fields = ('width', 'height', 'xpos', 'ypos', 'order', 'desc', 'branch',
                  'id', 'horizontal_num', 'vertical_num')


class CabinetSetDetailSerializer(serializers.ModelSerializer):

    cabinets = cabinet_serializers.CabinetSerializerForSelect(many=True)

    class Meta:
        model = models.CabinetSet
        fields = ('desc', 'id', 'horizontal_num', 'vertical_num', 'cabinets')


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
    cabinet = CabinetSerializerForSelect()
    cabinet_action = CabinetActionSerializer()
    user = user_serializers.UserSerializer()

    class Meta:
        model = models.CabinetHistory
        fields = ('id', 'user', 'cabinet', 'start_date', 'end_date',
                  'cabinet_action', 'created_at')


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


class CabinetDetailSerializer(serializers.ModelSerializer):
    cabinet_historys = HistorySerializer(many=True)
    user = user_serializers.UserSerializer()

    class Meta:
        model = models.Cabinet
        fields = ('id', 'cabinet_number', 'cabinet_set', 'xpos', 'ypos',
                  'updated_at', 'start_date', 'end_date', 'cabinet_historys',
                  'user')
