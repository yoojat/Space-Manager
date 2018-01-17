from rest_framework import serializers
from . import models
from space_manager.users import serializers as user_serializers
from space_manager.branches import serializers as branch_serializers


class MembershipSerializer(serializers.ModelSerializer):
    user = user_serializers.UserSerializer()
    branch = branch_serializers.BranchSerializer()
    creator = user_serializers.UserSerializer()

    class Meta:
        model = models.Membership
        fields =  '__all__'


class ActionSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Action
        fields = '__all__'


class MembershipHistorySerializer(serializers.ModelSerializer):
    
    user = user_serializers.UserSerializer()
    # branch = branch_serializers.BranchSerializer()
    action = ActionSerializer()

    class Meta:
        model = models.MembershipHistory
        fields = '__all__'