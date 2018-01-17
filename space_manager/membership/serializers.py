from rest_framework import serializers
from . import models

class MembershipSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Membership
        fields =  '__all__'

    

class ActionSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Action
        fields = '__all__'


class MembershipHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.MembershipHistory
        fields = '__all__'