from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from space_manager.users import models as users_model
from rest_framework import status

# Create your views here.

class Payment(APIView):
    
    def post(self, request, user_id, format=None):
        
        creator = request.user
        enrolled_user = users_model.User.objects.get(id=user_id)


        # 본인이 아닌 다른 사람이 결제할려고 할 경우
        # 관리자가 아닌 사람이 결제할 경우 400
        # 관리자일 경우 계속 진행
        if creator is not enrolled_user :
            if creator.is_superuser == False :
                return Response(data=serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


        serializer = serializers.PaymentHistorySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=enrolled_user, creator= creator)

            return Response(data=serializer.data, status= status.HTTP_201_CREATED)
        
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CostType(APIView):

    def get(self, request, format=None):
    
        all_cost_type = models.CostType.objects.all()

        serializer = serializers.CostTypeSerializer(all_cost_type, many=True)

        return Response(data=serializer.data)