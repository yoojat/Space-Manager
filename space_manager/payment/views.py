from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from space_manager.users import models as users_model
from rest_framework import status

# Create your views here.

class Payment(APIView):
    
    def post(self, request, user_id, format=None):
        
        user = request.user

        serializer = serializers.PaymentHistorySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=user)

            return Response(data=serializer.data, status= status.HTTP_201_CREATED)
        
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
