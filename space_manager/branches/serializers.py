from rest_framework import serializers
from . import models
from space_manager.membership import serializers as membership_serializers

class BranchSerializer(serializers.ModelSerializer):

    memberships = membership_serializers.MembershipSerializer() #error occur 
    class Meta:
        model = models.Branch
        fields = (
            'branch_num',
            'region',
            'branch_name',
            'address',
            'detail_address',
            'lat',
            'lng',
            'memberships'
        )
    
class BranchConfigSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.BranchConfig
        fields =  '__all__'
