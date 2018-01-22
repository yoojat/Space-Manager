from rest_framework import serializers
from . import models
from space_manager.users import serializers as user_serializers
# from space_manager.branches import serializers as branch_serializers


class EnrollTypeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.EnrollType
        fields = (
            'en_substance',
            'kr_substance',
        )

class CostTypeSerializer(serializers.ModelSerializer):
    
    enroll_type = EnrollTypeSerializer()

    class Meta:
        model = models.CostType
        fields = (
            'days',
            'cost',
            'enroll_type',
        )

class PaymentMethodSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.PaymentMethod
        fields = (
            'substance',
            'kr_substance',
        )

        

class PaymentHistorySerializer(serializers.ModelSerializer):
    
    user = user_serializers.UserSerializer(read_only=True)
    class Meta:
        model = models.PaymentHistory
        fields = (
            'user',
            'cost_type',
            'cost_value',
            'payment_method',
        )