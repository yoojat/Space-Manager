from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from space_manager.users import models as users_models
from rest_framework import status

# Create your views here.


class Payment(APIView):
    def post(self, request, user_id, format=None):
        # 사용자 결제하기
        # cost_type,cost_value,payment_method,is_usable

        creator = request.user
        enrolled_user = users_models.User.objects.get(id=user_id)

        # 본인이 아닌 다른 사람이 결제할려고 할 경우
        # 관리자가 아닌 사람이 결제할 경우 400
        # 관리자일 경우 계속 진행
        if creator is not enrolled_user:
            if creator.is_superuser == False:
                return Response(
                    data=serializer.errors,
                    status=status.HTTP_401_UNAUTHORIZED)

        serializer = serializers.PaymentHistorySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=enrolled_user, creator=creator)

            return Response(
                data=serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CostType(APIView):
    def get(self, request, format=None):
        # 결제 타입 불러오기
        # days,cost,enroll_type,cost_type,
        all_cost_type = models.CostType.objects.all()

        serializer = serializers.CostTypeSerializer(all_cost_type, many=True)

        return Response(data=serializer.data)


class OnlyYou(APIView):
    # 해당 회원의 개인 결제창 불러오기
    def find_pre_only_you(self, user_id):
        try:
            user = users_models.User.objects.get(id=user_id)
        except users_models.User.DoesNotExist:
            return None

        try:
            pre_only_you = models.OnlyYou.objects.get(user=user)
            return pre_only_you
        except models.OnlyYou.DoesNotExist:
            return None

    def get(self, request, user_id, format=None):
        # 해당 회원의 온리유 결제창 가져오기
        # user, cost_value
        pre_only_you = self.find_pre_only_you(user_id)

        if pre_only_you is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.OnlyYouSerializer(pre_only_you)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, user_id, format=None):
        # 해당 회원의 개인 결제창 추가하기
        # user, cost_value

        creator = request.user
        if creator.is_superuser == False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        try:
            user = users_models.User.objects.get(id=user_id)
        except users_models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        pre_only_you = self.find_pre_only_you(user_id)

        if pre_only_you is not None:
            return Response(status=status.HTTP_403_FORBIDDEN)

        data = {'cost_value': request.data['cost_value'], 'user': user_id}

        serializer = serializers.OnlyYouSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id, format=None):
        # 해당 유저의 결제창 삭제

        creator = request.user

        if creator.is_superuser == False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        pre_only_you = self.find_pre_only_you(user_id)

        if pre_only_you is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        pre_only_you.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    # 해당 회원의 결제창 수정
    def put(self, request, user_id, format=None):

        creator = request.user

        if creator.is_superuser == False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        pre_only_you = self.find_pre_only_you(user_id)

        if pre_only_you is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.OnlyYouSerializer(
            pre_only_you, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(
                data=serializer.data, status=status.HTTP_202_ACCEPTED)

        else:
            return Response(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Basket(APIView):
    def find_cost_type(self, cost_type_id):
        try:
            cost_type = models.CostType.objects.get(id=cost_type_id)
            return cost_type
        except models.CostType.DoesNotExist:
            return None

    def post(self, request, user_id, cost_type_id, format=None):
        user = request.user

        try:
            target_user = users_models.User.objects.get(id=user_id)
        except users_models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if user != target_user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        cost_type = self.find_cost_type(cost_type_id)
        if cost_type is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        new_basket = models.Basket.objects.create(
            user=user, cost_type=cost_type)

        new_basket.save()

        return Response(status=status.HTTP_201_CREATED)

    def delete(self, request, user_id, format=None):

        user = request.user

        try:
            target_user = users_models.User.objects.get(id=user_id)
        except users_models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if user != target_user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        basket_items = models.Basket.objects.filter(user=user)

        for item in basket_items:
            item.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class BasketDetail(APIView):
    def delete(self, request, item_id, format=None):

        user = request.user
        try:
            item = models.Basket.objects.get(id=item_id)
        except models.Basket.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if item.user != user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        item.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
