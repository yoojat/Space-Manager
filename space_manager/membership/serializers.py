from rest_framework import serializers
from . import models
from space_manager.users import serializers as user_serializers
from space_manager.branches import serializers as branch_serializers


class MembershipSerializer(serializers.ModelSerializer):

    # user = user_serializers.UserSerializer()
    branch = branch_serializers.BranchForMembershipSerializer()
    # creator = user_serializers.UserSerializer(read_only=True)

    class Meta:
        model = models.Membership
        fields =  (
            'user',
            'branch',
            'start_date',
            'end_date',
            'is_usable',
        )


class ActionSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Action
        fields = '__all__'


class MembershipHistorySerializer(serializers.ModelSerializer):
    
    creator = user_serializers.UserSerializer(read_only=True)
    action = ActionSerializer(read_only=True)
    membership = MembershipSerializer(read_only=True)

    class Meta:
        model = models.MembershipHistory
        fields = (
            'action',
            'membership',
            'creator',
        )


class InputMembershipSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Membership
        fields = (
            'start_date',
            'end_date',
            'branch',
        )


class InputMembershipHistorySerializer(serializers.ModelSerializer):
    
    membership = MembershipSerializer(read_only=True)
    creator = user_serializers.UserSerializer()
    action = ActionSerializer(read_only=True)

    class Meta:
        model = models.MembershipHistory
        fields = (
            'membership',
            'creator',
            'action'
        )
        