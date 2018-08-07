from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from rest_framework import status
from space_manager.branches import models as branch_models
from space_manager.users import models as user_models
from space_manager.payment import models as payment_models
from space_manager.payment import serializers as payment_serializers
from django.utils.datastructures import MultiValueDictKeyError
from datetime import datetime, timedelta


class CabinetDetail(APIView):
    def find_cabinet(self, cabinet_id):
        try:
            cabinet = models.Cabinet.objects.get(id=cabinet_id)
            return cabinet
        except models.Cabinet.DoesNotExist:
            return None

    def get(self, request, cabinet_id, format=None):
        """ get cabinet """
        # 사물함 단일 정보 불러오기
        # cabinet_number cabinet_set xpos ypos

        cabinet = self.find_cabinet(cabinet_id)
        if cabinet is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CabinetDetailSerializer(cabinet)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class CabinetLog(APIView):
    def get(self, request, user_id, format=None):
        user = user_models.User.objects.get(id=user_id)
        cabinet_historys = models.CabinetHistory.objects.filter(user=user)
        print(cabinet_historys)

        serializer = serializers.HistorySerializer(cabinet_historys, many=True)

        return Response(status=status.HTTP_200_OK, data=serializer.data)


class ExtendCabinetLog(APIView):
    def post(self, request, cabinet_id, format=None):
        cabinet = models.Cabinet.objects.get(id=cabinet_id)
        user = cabinet.user
        start_date = cabinet.start_date
        end_date = cabinet.end_date
        cabinet_action = models.CabinetAction.objects.get(substance='extend')

        new_cabinet_log = models.CabinetHistory.objects.create(
            user=user,
            cabinet=cabinet,
            start_date=start_date,
            end_date=end_date,
            cabinet_action=cabinet_action)

        new_cabinet_log.save()
        serializer = serializers.HistorySerializer(new_cabinet_log)

        return Response(data=serializer.data, status=status.HTTP_201_CREATED)


class EnrollCabinetLog(APIView):
    def post(self, request, cabinet_id, format=None):
        #user, cabinet, start_date, end_date, cabinet_action
        cabinet = models.Cabinet.objects.get(id=cabinet_id)
        user = cabinet.user
        start_date = cabinet.start_date
        end_date = cabinet.end_date
        cabinet_action = models.CabinetAction.objects.get(substance='regist')

        new_cabinet_log = models.CabinetHistory.objects.create(
            user=user,
            cabinet=cabinet,
            start_date=start_date,
            end_date=end_date,
            cabinet_action=cabinet_action)

        new_cabinet_log.save()

        serializer = serializers.HistorySerializer(new_cabinet_log)

        return Response(data=serializer.data, status=status.HTTP_201_CREATED)


class EnrollCabinets(APIView):
    def get_cabinet(self, id):
        try:
            found_user = models.Cabinet.objects.get(id=id)
            return found_user
        except models.User.DoesNotExist:
            return None

    def get_user(self, id):
        try:
            target_user = user_models.User.objects.get(id=id)
            return target_user
        except user_models.DoesNotExist:
            return None

    def put(self, request, format=None):

        cabinets = request.data['cabinets']
        is_clean = request.data['is_clean']
        start_date = request.data['start_date']
        end_date = request.data['end_date']
        user_id = request.data['user']
        target_user = self.get_user(user_id)

        for cabinet in cabinets:
            target_cabinet = self.get_cabinet(cabinet['id'])
            target_cabinet.start_date = start_date
            target_cabinet.end_date = end_date
            target_cabinet.user = target_user
            target_cabinet.is_clean = is_clean
            target_cabinet.save()

            serializer = serializers.CabinetSerializerForSelect(target_cabinet)

        return Response(data=serializer.data, status=status.HTTP_202_ACCEPTED)


class ExtendCabinet(APIView):
    # 맴버쉽 연장
    def put(self, request, format=None):

        # 슈퍼 유저 혹은 스태프인지 확인
        # 결제정보 확인

        cabinets_extend = request.data['cabinets_extend']
        days = request.data['days']
        try:
            for cabinet_extend in cabinets_extend:

                target_cabinet_obj = models.Cabinet.objects.get(
                    id=cabinet_extend['id'])
                target_cabinet_obj.end_date = target_cabinet_obj.end_date + timedelta(
                    hours=days * 24)
                target_cabinet_obj.save()

                serializer = serializers.CabinetSerializerForSelect(
                    target_cabinet_obj)
        except models.Cabinet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(data=serializer.data, status=status.HTTP_202_ACCEPTED)


class BranchCabinetSets(APIView):
    def find_branch(self, branch_id):
        try:
            branch = branch_models.Branch.objects.get(id=branch_id)
            return branch
        except branch_models.Branch.DoesNotExist:
            return None

    def get(self, request, branch_id, format=None):
        """ 지점정보(사물함세트정보 포함) 가져오기"""
        branch = self.find_branch(branch_id)

        if branch is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.BranchCabinetSetsSerializer(branch)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class MyCabinets(APIView):
    def find_using_cabinets(self, user):

        now = datetime.now()

        try:
            # 현재 사용자의 사물함 중 만료시각이 현재보다 같거나 큰 것들을 불러옴
            cabinets = models.Cabinet.objects.filter(user=user, is_clean=False)
            # cabinets = models.Cabinet.objects.filter(
            #     user=user, end_date__gte=now, is_clean=False)
            return cabinets
        except models.UseCabinet.DoesNotExist:
            return None

    # 현재 이용기간이 아니더라도 미래에 있는 사물함 까지불러옴 (사물함 등록을 위하여 필요함)
    def get(self, request, format=None):
        """ get by user """

        request_user = request.user

        # 본인이 아닌 다른 사람이 결제할려고 할 경우
        # 관리자가 아닌 사람이 결제할 경우 400
        # 관리자일 경우 계속 진행

        using_cabinets = self.find_using_cabinets(request_user)

        if using_cabinets is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CabinetSerializerForSelect(
            using_cabinets, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class CabinetsNowUsing(APIView):
    def find_using_cabinets(self, user):

        try:
            # 현재 사용자의 사물함 중 만료시각이 현재보다 같거나 크고, 사용
            cabinets = models.Cabinet.objects.filter(user=user, is_clean=False)

            return cabinets
        except models.UseCabinet.DoesNotExist:
            return None

    # 현재 이용기간에 포함되는 사물함만 불러옴
    def get(self, request, user_id, format=None):
        """ get by user """

        request_user = request.user
        target_user = user_models.User.objects.get(id=user_id)

        # 본인이 아닌 다른 사람이 결제할려고 할 경우
        # 관리자가 아닌 사람이 결제할 경우 400
        # 관리자일 경우 계속 진행
        if request_user != target_user:
            if request_user.is_superuser == False:
                return Response(status=status.HTTP_401_UNAUTHORIZED)

        using_cabinets = self.find_using_cabinets(target_user)

        if using_cabinets is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.UsecabSerializer(using_cabinets, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class CabinetByUser(APIView):
    def find_using_cabinets(self, user):

        now = datetime.now()

        try:
            # 현재 사용자의 사물함 중 만료시각이 현재보다 같거나 크고, 사용
            cabinets = models.Cabinet.objects.filter(user=user, is_clean=False)

            return cabinets
        except models.Cabinet.DoesNotExist:
            return None

    # 현재 이용기간이 아니더라도 미래에 있는 사물함 까지불러옴 (사물함 등록을 위하여 필요함)
    def get(self, request, user_id, format=None):
        """ get by user """

        request_user = request.user
        target_user = user_models.User.objects.get(id=user_id)

        # 본인이 아닌 다른 사람이 결제할려고 할 경우
        # 관리자가 아닌 사람이 결제할 경우 400
        # 관리자일 경우 계속 진행
        if request_user != target_user:
            if request_user.is_superuser == False:
                return Response(status=status.HTTP_401_UNAUTHORIZED)

        using_cabinets = self.find_using_cabinets(target_user)

        if using_cabinets is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CabinetSerializerForSelect(
            using_cabinets, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class CabinetSets(APIView):
    def find_branch(self, branch_id):

        try:
            branch = branch_models.Branch.objects.get(id=branch_id)
            return branch
        except branch_models.Branch.DoesNotExist:
            return None

    def post(self, request, branch_id, format=None):
        """ add cabinet set """

        # 캐비넷 세트 추가
        # width, height, order, desc

        user = request.user
        branch = self.find_branch(branch_id)

        if branch is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # 슈퍼 유저인지 검사
        if (user.is_superuser == False):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = serializers.InputCabinetSetSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(branch=branch)

            return Response(
                data=serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, branch_id, format=None):
        """ get cabinet set """
        # 해당 지점의 캐비넷 세트들 가지고 오기
        # branch, width, height, order, desc를 배열로
        branch = self.find_branch(branch_id)

        if branch is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        cabinet_sets = models.CabinetSet.objects.filter(branch=branch)

        serializer = serializers.CabinetSetSerializer(cabinet_sets, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class CabinetSet(APIView):
    def find_cabinet_set(self, cabinet_set_id):

        try:
            cabinet_set = models.CabinetSet.objects.get(id=cabinet_set_id)
            return cabinet_set
        except models.CabinetSet.DoesNotExist:
            return None

    def check_pre_cabinet(self, cabinet_number):

        return models.Cabinet.objects.filter(
            cabinet_number=cabinet_number).exists()

    def get(self, request, cabinet_set_id, format=None):
        # 캐비넷 세트 단일 정보 불러오기
        # branch, width, height, order, desc, cabinets

        cabinet_set = self.find_cabinet_set(cabinet_set_id)

        if cabinet_set is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CabinetSetDetailSerializer(cabinet_set)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, cabinet_set_id, format=None):
        # 캐비넷 세트 단일 정보 수정하기
        # branch, width, height, order, desc

        user = request.user
        if user.is_superuser is False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        cabinet_set = self.find_cabinet_set(cabinet_set_id)

        if cabinet_set is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CabinetSetSerializer(
            cabinet_set, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(
                data=serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, cabinet_set_id, format=None):
        # 캐비넷 추가하기
        # cabinet_number xpos ypos
        user = request.user

        if user.is_superuser is False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        cabinet_set = self.find_cabinet_set(cabinet_set_id)

        if cabinet_set is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # 해당 사물함번호 있는지 확인 (중복확인)
        cabinet_number = request.data['cabinet_number']

        if self.check_pre_cabinet(cabinet_number) is True:
            return Response(status=status.HTTP_409_CONFLICT)

        serializer = serializers.InputCabinetSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(cabinet_set=cabinet_set)
            return Response(
                data=serializer.data, status=status.HTTP_201_CREATED)

        else:
            print(serializer.errors)
            return Response(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Cabinet(APIView):
    def find_cabinet(self, cabinet_id):
        try:
            cabinet = models.Cabinet.objects.get(id=cabinet_id)
            return cabinet
        except models.Cabinet.DoesNotExist:
            return None

    def get(self, request, cabinet_id, format=None):
        """ get cabinet """
        # 사물함 단일 정보 불러오기
        # cabinet_number cabinet_set xpos ypos

        cabinet = self.find_cabinet(cabinet_id)
        if cabinet is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.InputCabinetSerializer(cabinet)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, cabinet_id, format=None):
        # 사물함 단일 정보 수정하기
        # cabinet_number cabinet_set xpos ypos

        cabinet = self.find_cabinet(cabinet_id)
        if cabinet is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.InputCabinetSerializer(
            cabinet, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(
                data=serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, cabinet_id, format=None):
        # 사물함 단일 정보 삭제하기
        cabinet = self.find_cabinet(cabinet_id)
        if cabinet is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        cabinet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# class Allocate(APIView):
#     def payment_checkout(self, payment):

#         payment_serializer = payment_serializers.InputPaymentSerializer(
#             payment, data={'is_usable': False}, partial=True)

#         if payment_serializer.is_valid():
#             payment_serializer.save()
#             return True

#         else:
#             return False

#     def check_overlap(self, usable_usecabinets, start_date, end_date):
#         # 날짜 중복 여부 검사
#         for usecabinet in usable_usecabinets:
#             if usecabinet.end_date >= start_date and usecabinet.start_date <= end_date:
#                 return False
#         return True

#     def payment_checkout(self, payment):

#         payment_serializer = payment_serializers.InputPaymentSerializer(
#             payment, data={'is_usable': False}, partial=True)

#         if payment_serializer.is_valid():
#             payment_serializer.save()
#             return True

#         else:
#             return False

# def post(self, request, cabinet_id, user_id, format=None):
#     # 사물함 등록하기
#     # start_date, days
#     # 사용자일 경우 payment_id
#     creator = request.user
#     user = user_models.User.objects.get(id=user_id)
#     action = models.CabinetAction.objects.get(substance='regist')
#     payment = None

#     try:
#         days = int(request.data['days'])
#         start_date = datetime.strptime(request.data['start_date'],
#                                        '%Y-%m-%d %H:%M:%S')
#         end_date = start_date + timedelta(days=days)

#         cabinet = models.Cabinet.objects.get(id=cabinet_id)

#     except MultiValueDictKeyError:
#         return Response(status=status.HTTP_400_BAD_REQUEST)

#     except models.Cabinet.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if creator.is_superuser is False:
#         if creator != user:
#             return Resonse(status=status.HTTP_401_UNAUTHORIZED)

#         try:
#             payment_id = int(request.data['payment'])
#         except MultiValueDictKeyError:
#             return Response(status=status.HTTP_400_BAD_REQUEST)

#         try:
#             payment = payment_models.PaymentHistory.objects.get(
#                 id=payment_id)

#         except payment_models.PaymentHistory.DoesNotExist:
#             payment = None

#         if payment.cost_type.days != days:
#             return Response(status=status.HTTP_400_BAD_REQUEST)

#         if self.payment_checkout(payment) is False:
#             return Response(status=status.HTTP_400_BAD_REQUEST)

#     now = datetime.today()
#     usable_usecabinets = models.UseCabinet.objects.filter(
#         end_date__gte=now, is_usable=True, user=user, is_clean=False)

#     if self.check_overlap(usable_usecabinets, start_date,
#                           end_date) is False:
#         return Response(status=status.HTTP_403_FORBIDDEN)

#     new_enroll = models.UseCabinet.objects.create(
#         cabinet=cabinet,
#         payment=payment,
#         user=user,
#         start_date=start_date,
#         end_date=end_date)

#     new_history = models.CabinetHistory.objects.create(
#         cabinet=cabinet,
#         user=user,
#         start_date=start_date,
#         end_date=end_date,
#         cabinet_action=action)

#     payment_check = self.payment_checkout(payment)

#     if payment_check is False:
#         return Response(status=status.HTTP_400_BAD_REQUEST)

#     new_enroll.save()

#     return Response(status=status.HTTP_201_CREATED)

# class CabinetMembership(APIView):
#     def find_use_cabinet(self, usecab_id):
#         try:
#             use_cabinet = models.UseCabinet.objects.get(id=usecab_id)
#             return use_cabinet
#         except models.UseCabinet.DoesNotExist:
#             return None

#     def put(self, request, usecab_id, format=None):
#         # 사물함 수정하기
#         # 'cabinet', 'payment', 'user', 'start_date', 'end_date', 'is_usable', 'is_clean',

#         action = models.CabinetAction.objects.get(substance='modify')

#         if request.user.is_superuser is False:
#             return Response(status=status.HTTP_401_UNAUTHORIZED)

#         use_cabinet = self.find_use_cabinet(usecab_id)
#         if use_cabinet is None:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         user = use_cabinet.user
#         cabinet = use_cabinet.cabinet
#         start_date = use_cabinet.start_date
#         end_date = use_cabinet.end_date

#         serializer = serializers.UsecabSerializer(
#             use_cabinet, data=request.data, partial=True)

#         if serializer.is_valid():

#             new_history = models.CabinetHistory.objects.create(
#                 cabinet=cabinet,
#                 user=user,
#                 start_date=start_date,
#                 end_date=end_date,
#                 cabinet_action=action)

#             serializer.save()
#             new_history.save()

#             return Response(
#                 data=serializer.data, status=status.HTTP_202_ACCEPTED)
#         else:
#             return Response(
#                 data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, usecab_id, format=None):
#         # 사물함 등록정보 삭제하기

#         if request.user.is_superuser is False:
#             return Response(status=status.HTTP_401_UNAUTHORIZED)

#         use_cabinet = self.find_use_cabinet(usecab_id)
#         if use_cabinet is None:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         user = use_cabinet.user
#         cabinet = use_cabinet.cabinet
#         start_date = use_cabinet.start_date
#         end_date = use_cabinet.end_date
#         action = models.CabinetAction.objects.get(substance='expire')

#         new_history = models.CabinetHistory.objects.create(
#             cabinet=cabinet,
#             user=user,
#             start_date=start_date,
#             end_date=end_date,
#             cabinet_action=action)

#         use_cabinet.delete()
#         new_history.save()

#         return Response(status=status.HTTP_204_NO_CONTENT)


class CabinetLock(APIView):
    def find_branch(self, branch_id):
        try:
            branch = branch_models.Branch.objects.get(id=branch_id)
            return branch
        except branch_models.Branch.DoesNotExist:
            return None

    def post(self, request, branch_id, format=None):

        branch = self.find_branch(branch_id)
        if branch is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.InputCabLockSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(branch=branch)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, branch_id, format=None):
        branch = self.find_branch(branch_id)
        if branch is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        cablocks = models.CabinetLock.objects.filter(branch=branch)

        serializer = serializers.CabLockSerializer(cablocks, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class CabinetLockDetail(APIView):
    def put(self, request, cablock_id, format=None):

        try:
            lock = models.CabinetLock.objects.get(id=cablock_id)
        except models.CabinetLock.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CabLockSerializer(
            lock, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(
                data=serializer.data, status=status.HTTP_202_ACCEPTED)

        else:
            return Response(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
