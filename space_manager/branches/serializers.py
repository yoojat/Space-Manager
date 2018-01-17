from . import models
from rest_framework import serializers


class BranchSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Branch
        fields =  '__all__'

    
class BranchConfigSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.BranchConfig
        fields =  '__all__'
