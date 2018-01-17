from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers

class ListAllBranches(APIView):
    
    def get(self, request, format=None):

        all_branches = models.Branch.objects.all()

        serializer = serializers.BranchSerializer(all_branches, many=True)

        return Response(data=serializer.data)

class ListAllBranchConfigs(APIView):
    
    def get(self, request, format=None):

        all_branch_configs = models.BranchConfig.objects.all()

        serializer = serializers.BranchSerializer(all_branch_configs, many=True)

        return Response(data=serializer.data)

