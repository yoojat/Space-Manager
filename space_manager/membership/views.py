from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from space_manager.users import models as users_models
from space_manager.payment import models as payment_models
from space_manager.payment import serializers as payment_serializers
from space_manager.branches import models as branch_models
from rest_framework import status
import datetime
    
class GetActions(APIView):
    
    def get(self, request, format=None):
    
        all_actions = models.Action.objects.all()

        serializer = serializers.ActionSerializer(all_actions, many=True)

        return Response(data=serializer.data)


class GetMemberships(APIView):
        
    def get(self, request, user_id, format=None):
    
        all_memberships = models.Membership.objects.filter(user__id=user_id)

        serializer = serializers.MembershipSerializer(all_memberships, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)



class EnrollMembership(APIView):
    
    def check_user(self, user, creator):
        
        if user == creator:
            return True
        
        else :
            return False


    def check_payment_user(self, user, payment):

        if payment.user == user :
            return True
        else :
            return False


    def check_payment_days(self, payment, enroll_days):
        
        if payment.cost_type.days == enroll_days :
            return True
        else :
            return False
    
    def check_payment_usable(self, payment):
        return payment.is_usable

    def payment_checkout(self, payment):
        
        payment_serializer = payment_serializers.InputPaymentSerializer(
            payment, data= { 'is_usable':False}, partial=True
            )

        if payment_serializer.is_valid():
            payment_serializer.save()
            return True
        
        else:
            return False

    def enroll_membership(sefl, membership):

        membership.save()

        return True

    def enroll_membership_history(self, membership, creator, action):
        new_membership_history = models.MembershipHistory.objects.create(
            membership = membership,
            creator = creator,
            action =action,
        )
        new_membership_history.save()

        return True

    def post(self, request, user_id, payment_id, format=None):
        # request -> {"start_date":"2018-10-10 12:22:12", "days":"30", "branch_id":"1"}
        # 맴버쉽 등록
        creator = request.user
        action = models.Action.objects.get(substance='regist')
        enrolled_days = int(request.data['days'])

        try:
            payment = payment_models.PaymentHistory.objects.get(id=payment_id)
        except payment_models.PaymentHistory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        start_date = datetime.datetime.strptime(request.data['start_date'], '%Y-%m-%d %H:%M:%S')
        # 하루 등록시 12시간
        if enrolled_days is 1:
            end_date = start_date + datetime.timedelta(hours=12)
        
        # 그 외에는 일수로 계산
        else :
            end_date = start_date + datetime.timedelta(days=enrolled_days)

        branch_id = int(request.data['branch_id'])

        try:
            branch_enrolled = branch_models.Branch.objects.get(id=branch_id)
        
        except branch_models.Branch.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # 등록할 사용자 찾기
        try:
            user_to_enrolled = users_models.User.objects.get(id=user_id)
        
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        

        # 사용자가 아닌 다른 사람이 등록 요청을 할시 404
        if self.check_user(user_to_enrolled, creator) is False:
            print('check_user_error')

            return Response(status=status.HTTP_400_BAD_REQUEST)

        # 결제 정보 확인, 결제한 데이터가 현재도 유효한지 검사
        if self.check_payment_usable(payment) is False:
            print('check_payment_usable_error')

            return Response(status=status.HTTP_400_BAD_REQUEST)            

        # 사용자가 직접등록할시 본인 결제여부 확인
        if self.check_payment_user(user_to_enrolled, payment) is False:
            print('checkpayment_user_error')
            return Response(status=status.HTTP_400_BAD_REQUEST)


        # 등록 요청한 날이랑 결제한 날이랑 맞는지 확인
        if self.check_payment_days(payment, enrolled_days) is False:
            print('check_payment_days_error')

            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        # 결제한 정보 체크아웃 처리
        if self.payment_checkout(payment) is False:
            print('payment_checkout_error')

            return Response(status=status.HTTP_400_BAD_REQUEST)

        

        # 멤버쉽 등록
        new_membership = models.Membership.objects.create(
            user= user_to_enrolled,
            branch= branch_enrolled,
            start_date= start_date,
            end_date = end_date
        )
        if(self.enroll_membership(new_membership)):
            if self.enroll_membership_history(new_membership, creator, action):
                return Response(data = new_membership, status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
 



