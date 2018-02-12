from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from rest_framework import status
from space_manager.users import models as user_models
from space_manager.membership import models as membership_models
from uuid import uuid4
from datetime import datetime, timedelta
import pyqrcode
import os
from django.core.files import File
from django.utils.datastructures import MultiValueDictKeyError

LIMIT_SECOND = 15


class QR(APIView):
    def get_membership(self, user):

        now = datetime.today()
        try:
            membership = membership_models.Membership.objects.get(
                end_date__gte=now,
                start_date__lte=now,
                is_usable=True,
                user=user)

            return membership

        except membership_models.Membership.DoesNotExist:
            return None

    #  큐알코드 생성
    def post(self, request, user_id, format=None):
        creator = request.user
        user = user_models.User.objects.get(id=user_id)

        if creator != user:
            if creator.is_superuser:
                return Response(status=status.HTTP_401_UNAUTHORIZED)

        # 멤버쉽에 등록되어있는지 확인
        membership = self.get_membership(user)

        if membership is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        randomString = str(uuid4()).replace("-", "")

        qr_code = pyqrcode.create(randomString)
        generate_name = randomString + '.svg'
        qr_code.svg(generate_name, scale=6)

        now = datetime.today()
        end_date = now + timedelta(seconds=LIMIT_SECOND)

        with open(generate_name, 'rb') as qr_img:
            new_qr_code = models.QR.objects.create(
                user=user,
                qr_str=randomString,
                end_date=end_date,
                qr_code_img=File(qr_img))

            new_qr_code.save()
            os.remove(generate_name)

        return Response(status=status.HTTP_201_CREATED)


class Temp(APIView):
    def post(self, request, format=None):
        if request.user.is_superuser is False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        randomString = str(uuid4()).replace("-", "")

        qr_code = pyqrcode.create(randomString)
        generate_name = randomString + '.svg'
        qr_code.svg(generate_name, scale=6)

        with open(generate_name, 'rb') as qr_img:
            serializer = serializers.TempSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(
                    qr_code_img=File(qr_img),
                    qr_str=randomString,
                    user=request.user)
                os.remove(generate_name)
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)


class Check(APIView):
    def post(self, request, format=None):
        try:
            qr_str = request.data['qr_str']
            check_in_out = request.data['check_in_out']
        except MultiValueDictKeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        qr = models.QR.objects.get(qr_str=qr_str)
        # 시간대 검사
        if qr.end_date < datetime.today():
            return Response(status=status.HTTP_403_FORBIDDEN)

        new_check = models.CheckInOut.objects.create(
            qr=qr, check_in_out=check_in_out)

        new_check.save()

        return Response(status=status.HTTP_201_CREATED)
