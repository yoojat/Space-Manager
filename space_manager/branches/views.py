from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from rest_framework import status


class Branches(APIView):
    def post(self, request, format=None):
        """ add branch """

        user = request.user

        # 슈퍼 유저인지 검사
        if (user.is_superuser == False):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = serializers.BranchSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                data=serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Resonse(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        """ get branches """

        branches = models.Branch.objects.filter(usable=True)

        serializer = serializers.BriefBranchSerializer(branches, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class BranchDetail(APIView):
    def find_branch(self, branch_id):
        try:
            branch = models.Branch.objects.get(id=branch_id)
            return branch
        except models.Branch.DoesNotExist:
            return None

    """ get branch info detail """

    def get(self, request, branch_id, format=None):

        branch = models.Branch.objects.get(id=branch_id)

        serializer = serializers.BranchSerializer(branch)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    """ edit branch info """

    def put(self, request, branch_id, format=None):

        user = request.user

        # 슈퍼 유저인지 검사
        if (user.is_superuser == False):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        branch = self.find_branch(branch_id)

        if branch is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.BranchSerializer(
            branch, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            return Response(
                data=serializer.data, status=status.HTTP_202_ACCEPTED)

        else:
            return Response(
                data=seraialize.errors, status=status.HTTP_400_BAD_REQUEST)


class Search(APIView):
    def get(self, request, format=None):

        user = request.user

        # 슈퍼 유저인지 검사
        if (user.is_superuser == False):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        query = request.GET.get('branchname', '')

        branches = models.Branch.objects.filter(branch_name__in=query)

        return Response(status=status.HTTP_200_OK)
