from rest_framework import serializers
from . import models

class MembershipSerializer(serializers.Serializer):

    class Meta:
        model = models.Membership
        fields =  '__all__'

    

class ActionSerializer(serailizers.Serializer):

    class Meta:
        model = models.Action
        fields = '__all__'


class MembershipHistorySerializer(serializers.Serializer):

    class Meta:
        model = models.MembershipHistory
        fields = '__all__'