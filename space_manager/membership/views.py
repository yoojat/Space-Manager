from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from space_manager.users import models as users_model
from rest_framework import status

class EnrollMembership(APIView):

    def post(self, request, format=None):
        


        # try:
        #     member = users_model.User.objects.get(id=user_id)
        # except users_model.User.DoesNotExist:
        #     return Response(status=status.)

        # 현재 등록되어 있는 맴버쉽 중 등록하고싶은 날짜랑 겹치는 날이 있는지?
        #     등록 안됨
        # 겹치는 날이 없으면
        #     등록
    


        # 이미 겹치는 맴버쉽 날짜가 있는지 확인
        # lecture 44
 
        # new_membership = models.Membership.objects.get(
        #     user = member,
            # branch
            # start_date
            # end_date
            # is_usable
            # 다른 정보들 불러오는 방법?
        #     creator = request.user
        # )

        # new_membership.save()


        # return Response(status=200)
        return Response(status=200)