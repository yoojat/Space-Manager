from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from space_manager.users import models as users_models
from space_manager.payment import models as payment_models
from space_manager.payment import serializers as payment_serializers
from space_manager.branches import models as branch_models
from rest_framework import status
from datetime import datetime, timedelta


class GetActions(APIView):
    # 액션 정보 불러오기(취소, 연장, 등록)
    def get(self, request, format=None):

        all_actions = models.Action.objects.all()

        serializer = serializers.ActionSerializer(all_actions, many=True)

        return Response(data=serializer.data)


class GetMemberships(APIView):
    def get(self, request, user_id, format=None):
        # 맴버쉽 정보 가져오기, 만료되거나 취소된 맴버쉽 경우 제외
        # user, branch, start_date, end_date, is_usable

        request_user = request.user
        target_user = users_models.User.objects.get(id=user_id)

        # 본인이 아닌 다른 사람이 결제할려고 할 경우
        # 관리자가 아닌 사람이 결제할 경우 400
        # 관리자일 경우 계속 진행
        if request_user != target_user:
            if request_user.is_superuser == False:
                return Response(status=status.HTTP_401_UNAUTHORIZED)

        now = datetime.today()
        all_memberships = models.Membership.objects.filter(
            user=target_user, end_date__gte=now, is_usable=True)

        serializer = serializers.MembershipSerializer(
            all_memberships, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class EnrollMembershipBySuper(APIView):
    def check_overlap(self, user, start_date, end_date):
        now = datetime.today()
        usable_memberships = models.Membership.objects.filter(
            end_date__gte=now, is_usable=True, user=user)

        for membership in usable_memberships:
            if membership.end_date >= start_date and membership.end_date < end_date:
                return False

            if membership.start_date <= start_date and end_date <= membership.start_date:
                return False

            if membership.start_date <= end_date and start_date < membership.start_date:
                return False
        return True

    def enroll_membership_history(self, membership, creator, action):
        new_membership_history = models.MembershipHistory.objects.create(
            membership=membership,
            creator=creator,
            action=action,
        )
        new_membership_history.save()

        return True

    def enroll_membership(sefl, membership):

        membership.save()

        return True

    def post(self, request, user_id, format=None):
        # 맴버쉽 등록, 슈퍼유저만
        # user,branch,start_date,end_date,is_usable

        creator = request.user
        enrolled_days = int(request.data['days'])
        action = models.Action.objects.get(substance='regist')

        if creator.is_superuser is False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # 등록할 사용자 찾기
        try:
            user_to_enrolled = users_models.User.objects.get(id=user_id)

        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        #등록할 지점 찾기

        branch_id = int(request.data['branch_id'])
        try:
            branch_enrolled = branch_models.Branch.objects.get(id=branch_id)

        except branch_models.Branch.DoesNotExist:
            print('no')
            return Response(status=status.HTTP_404_NOT_FOUND)

        start_date = datetime.strptime(request.data['start_date'],
                                       '%Y-%m-%d %H:%M:%S')
        # 하루 등록시 12시간
        if enrolled_days is 1:
            end_date = start_date + timedelta(hours=12)

        # 그 외에는 일수로 계산
        else:
            end_date = start_date + timedelta(days=enrolled_days)

        # 이미 등록되어있는 맴버쉽중 겹치는 날이 있는지 확인
        if self.check_overlap(user_to_enrolled, start_date, end_date) is False:
            return Response(status=status.HTTP_403_FORBIDDEN)

        # 멤버쉽 등록
        new_membership = models.Membership.objects.create(
            user=user_to_enrolled,
            branch=branch_enrolled,
            start_date=start_date,
            end_date=end_date)

        serializer = serializers.MembershipSerializer(new_membership)

        if (self.enroll_membership(new_membership)):
            if self.enroll_membership_history(new_membership, creator, action):
                return Response(
                    data=serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, membership_id, format=None):
        # 맴버쉽 정보 수정하기 오직 슈퍼유저만
        #start_date, end_date, branch, is_usable

        if request.user.is_superuser is False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        membership = models.Membership.objects.get(id=membership_id)

        serializer = serializers.ModMembershipSerializer(
            membership, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                data=serializer.data, status=status.HTTP_202_ACCEPTED)

        else:
            return Response(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EnrollMembership(APIView):
    def check_overlap(self, user, start_date, end_date):
        now = datetime.today()
        usable_memberships = models.Membership.objects.filter(
            end_date__gte=now, is_usable=True, user=user)

        for membership in usable_memberships:
            if membership.end_date >= start_date and membership.end_date < end_date:
                return False

            if membership.start_date <= start_date and end_date <= membership.start_date:
                return False

            if membership.start_date <= end_date and start_date < membership.start_date:
                return False
        return True

    def check_user(self, user, creator):

        if user == creator:
            return True

        else:
            return False

    def check_payment_user(self, user, payment):

        if payment.user == user:
            return True
        else:
            return False

    def check_payment_days(self, payment, enroll_days):

        if payment.cost_type.days == enroll_days:
            return True
        else:
            return False

    def check_payment_usable(self, payment):
        return payment.is_usable

    def payment_checkout(self, payment):

        payment_serializer = payment_serializers.InputPaymentSerializer(
            payment, data={'is_usable': False}, partial=True)

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
            membership=membership,
            creator=creator,
            action=action,
        )
        new_membership_history.save()

        return True

    def post(self, request, user_id, payment_id, format=None):
        # 멤버쉽 등록
        # request -> {"start_date":"2018-10-10 12:22:12", "days":"30", "branch_id":"1"}
        # 맴버쉽 등록
        creator = request.user
        action = models.Action.objects.get(substance='regist')
        enrolled_days = int(request.data['days'])

        try:
            payment = payment_models.PaymentHistory.objects.get(id=payment_id)
        except payment_models.PaymentHistory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        start_date = datetime.datetime.strptime(request.data['start_date'],
                                                '%Y-%m-%d %H:%M:%S')
        # 하루 등록시 12시간
        if enrolled_days is 1:
            end_date = start_date + datetime.timedelta(hours=12)

        # 그 외에는 일수로 계산
        else:
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
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # 결제 정보 확인, 결제한 데이터가 현재도 유효한지 검사
        if self.check_payment_usable(payment) is False:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # 사용자가 직접등록할시 본인 결제여부 확인
        if self.check_payment_user(user_to_enrolled, payment) is False:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # 등록 요청한 날이랑 결제한 날이랑 맞는지 확인
        if self.check_payment_days(payment, enrolled_days) is False:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # 이미 등록되어있는 맴버쉽중 겹치는 날이 있는지 확인
        if self.check_overlap(user, start_date, end_date) is False:
            return Response(status=status.HTTP_403_FORBIDDEN)

        # 결제한 정보 체크아웃 처리
        if self.payment_checkout(payment) is False:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # 멤버쉽 등록
        new_membership = models.Membership.objects.create(
            user=user_to_enrolled,
            branch=branch_enrolled,
            start_date=start_date,
            end_date=end_date)

        serializer = serializers.MembershipSerializer(new_membership)

        if (self.enroll_membership(new_membership)):
            if self.enroll_membership_history(new_membership, creator, action):
                return Response(
                    data=serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
