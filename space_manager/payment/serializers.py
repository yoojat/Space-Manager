from rest_framework import serializers
from . import models
from space_manager.users import serializers as user_serializers

# from space_manager.branches import serializers as branch_serializers


class EnrollTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EnrollType
        fields = (
            'id',
            'en_substance',
            'kr_substance',
        )


class CabinetCostTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CabinetCostType
        fields = (
            'id',
            'title',
            'days',
            'cost',
            'enroll_type',
            'cost_type',
        )


class CostTypeSerializer(serializers.ModelSerializer):

    enroll_type = EnrollTypeSerializer()
    cabinet_cost_type = CabinetCostTypeSerializer()

    class Meta:
        model = models.CostType
        fields = (
            'id',
            'days',
            'cost',
            'enroll_type',
            'cabinet_cost_type',
            'cost_type',
            'title',
        )


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PaymentMethod
        fields = (
            'id',
            'substance',
            'kr_substance',
        )


class PaymentHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PaymentHistory
        fields = (
            'membership_cost_type',
            'cabinet_cost_type',
            'cost_value',
            'payment_method',
            'is_usable',
        )

        # read_only_fields = ('created_at', )


class InputPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PaymentHistory
        fields = ('is_usable', )


class OnlyYouSerializer(serializers.ModelSerializer):

    user = user_serializers.SimpleUserSerializer()

    class Meta:
        model = models.OnlyYou
        fields = (
            'user',
            'cost_value',
        )


class InputOnlyYouSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OnlyYou
        fields = ('cost_value', )


class AddBasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Basket,
        fields = ('cost_type', )
