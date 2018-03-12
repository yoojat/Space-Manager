from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from rest_framework import status


class Branches(APIView):
    def post(self, request, format=None):
        """ add branch """
        # 제목 : 지점 추가
        # 설명 : 데이터를 통해 지점을 추가
        # 필요데이터
        # branch_num, region, branch_name, address, detail_address, lat, lng, lounge_img, seats

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
            return Response(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        """ get branches """
        # 제목 : 모든 지점 정보 가져오기
        # 설명 : 모든 지점 정보를 다가지고 온다
        # 가지고 오는 데이터
        # id,branch_num,region, branch_name,address,detail_address,lat,lng,lounge_img 를 배열로
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
        # 제목 : 하나의 지점 정보 가져오기
        # 설명 : 하나의 지점정보를 디테일하게 가지고 온다
        # 가지고 오는 데이터
        # 해당 지점에 해당되는 id,branch_num,region, branch_name,address,detail_address,lat,lng,lounge_img

        branch = models.Branch.objects.get(id=branch_id)

        serializer = serializers.BranchSerializer(
            branch, context={
                'reqeust': request
            })
        #serializer가 request를 받을 수 있음

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    """ edit branch info """

    def put(self, request, branch_id, format=None):
        # 제목 : 하나의 지점 정보 수정하기
        # 설명 : 하나의 지점정보를 수정한다
        # 수정하는 데이터
        # 해당 지점에 해당되는 id,branch_num,region, branch_name,address,detail_address,lat,lng,lounge_img

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
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Search(APIView):
    def get(self, request, format=None):
        # 제목 : 지점이름으로 검색하기
        # 설명 : 검색을 통해 지점을 배열로 리턴
        # 데이터
        # 해당 지점에 해당되는 id,branch_num,region, branch_name,address,detail_address,lat,lng,lounge_img 를 배열로
        user = request.user

        # 슈퍼 유저인지 검사
        if (user.is_superuser == False):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        query = request.GET.get('branchname', '')
        branches = models.Branch.objects.filter(branch_name__icontains=query)

        serializer = serializers.BranchSerializer(branches, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)
