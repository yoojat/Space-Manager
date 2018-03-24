from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from space_manager.rooms import models as rooms_models
from space_manager.membership import models as membership_models
from space_manager.branches import models as branch_models
from space_manager.users import models as user_models
from rest_framework import status
from datetime import datetime
from random import *
from operator import eq


class Seats(APIView):
    #  해당열람실에 좌석 추가하기
    #  data :seat_number,left,top,rotate
    def post(self, request, room_id, format=None):

        user = request.user

        # 슈퍼 유저인지 검사
        if (user.is_superuser == False):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        try:
            room = rooms_models.Room.objects.get(id=room_id)
        except rooms_models.Room.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        data = request.data
        data['room'] = room_id
        data['branch'] = room.branch.id

        serializer = serializers.InputSeatSerializer(data=data)
        if serializer.is_valid():

            serializer.save()

            return Response(
                data=serializer.data, status=status.HTTP_201_CREATED)

        else:

            return Response(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, room_id, format=None):
        # 해당 열람실에 해당되는 좌석 가져오기
        # data : seat_number,left,top,rotate,usable,discard
        try:
            seats = models.Seat.objects.filter(room__id=room_id)
        except models.Seat.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ShowSeatSerializer(seats, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class Seat(APIView):
    def find_seat(self, seat_id):
        try:
            seat = models.Seat.objects.get(id=seat_id)
            return seat
        except models.Seat.DoesNotExist:
            return None

    def get(self, request, seat_id, format=None):
        # 해당 좌석 정보 가져오기
        # data : seat_number,left,top,rotate,usable,discard,room,branch,
        try:
            seat = models.Seat.objects.get(id=seat_id)
        except mdoels.Seat.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.SeatSerializer(seat)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, seat_id, format=None):
        # 해당 좌석 수정하기
        # data : seat_number,left,top,rotate,usable,discard,room,branch

        user = request.user
        # 슈퍼 유저인지 검사
        if (user.is_superuser == False):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        seat = self.find_seat(seat_id)

        if seat is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.SeatSerializer(
            seat, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            return Response(
                data=serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Allocation(APIView):
    def is_adult(self, birth):
        now = datetime.today()
        delta = birth - now
        if delta / 365 >= 19:
            return True
        else:
            return False

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

    def check_branch_config(self, seat, user):

        membership = self.get_membership(user)

        if membership is None:
            return False

        try:
            branch_config = branch_models.BranchConfig.objects.get(
                branch=seat.branch)
        except branch_models.BranchConfig.DoesNotExist:
            return False

        if branch_config.man_usable is False:
            if user.gender is 'male' and self.is_adult(user.birth):
                return False

        if branch_config.woman_usable is False:
            if user.gender is 'female' and self.is_adult(user.birth):
                return False

        if branch_config.boy_usable is False:
            if user.gender is 'male' and self.is_adult(user.birth) is False:
                return False

        if branch_config.girl_usable is False:
            if user.gender is 'female' and self.is_adult(user.birth) is False:
                return False

        if branch_config.other_usable is False:
            if membership.branch is not seat.branch:
                return False

        return True

    def is_usable_seat(self, seat):
        usable = seat.usable
        discard = seat.discard

        if usable is True and discard is False:
            return True
        else:
            return False

    def is_empty_seat(self, seat):

        logs = models.Log.objects.filter(seat=seat)[:1]
        # 아무정보가 없는 좌석 즉 처음만들어진 좌석일 경우
        if not logs:
            return True

        log = logs[0]
        action = log.action.en_substance

        if eq(action, 'stand_by'):
            return True
        elif eq(action, 'return'):
            return True
        elif eq(action, 'allocation'):
            return False
        else:
            return True

    def is_usable_room(self, seat):
        room = seat.room
        if room.usable is False:
            return False
        else:
            return True

    def set_seat_state(self, seat, sel_image, state):

        seat.now_using = state
        seat.seat_image = sel_image
        seat.save()

    def seat_before_return(self, user):

        try:
            user_recent_log = models.Log.objects.filter(
                user=user).latest('created_at')

        except models.Log.DoesNotExist:
            return True

        try:
            return_action = models.Action.objects.get(en_substance='return')
        except models.Action.DoesNotExist:
            return False

        if user_recent_log.action == return_action:
            return True

        try:
            return_action = models.Action.objects.get(en_substance='return')
            seat_return_image = models.SeatImage.objects.get(
                action=return_action)
        except models.SeatImage.DoesNotExist:
            return False

        new_log = models.Log.objects.create(
            action=return_action,
            user=user,
            seat=user_recent_log.seat,
            seat_image=seat_return_image)

        result = new_log.save()
        self.set_seat_state(user_recent_log.seat, seat_return_image, False)

        return True

    def allocate(self, user, seat):
        try:
            allocate_action = models.Action.objects.get(
                en_substance='allocation')
        except models.Action.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if user.gender is None:
            seat_images = models.SeatImage.objects.exclude(
                gender='Not-specified')
        else:
            seat_images = models.SeatImage.objects.filter(gender=user.gender)

        count_images = len(seat_images)
        rand_limit = count_images - 1
        random_image_number = randint(0, rand_limit)
        sel_image = seat_images[random_image_number]

        new_log = models.Log.objects.create(
            action=allocate_action, user=user, seat=seat, seat_image=sel_image)

        new_log.save()

        self.set_seat_state(seat, sel_image, True)

        return Response(status=status.HTTP_201_CREATED)

    def post(self, request, seat_id, user_id, format=None):
        # 자리 배정, 슈퍼 유저 기능 포함
        # 데이터 없음
        creator = request.user

        try:
            user = user_models.User.objects.get(id=user_id)
        except user_models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            seat = models.Seat.objects.get(
                id=seat_id, usable=True, discard=False)
        except models.Seat.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # 슈퍼유저 확인
        if creator.is_superuser is False:
            if creator != user:
                return Response(status=status.HTTP_401_UNAUTHORIZED)

        # 멤버쉽에 등록되어있는지 확인
        now = datetime.today()

        membership = self.get_membership(user)

        if membership is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # 지점 옵션에 걸리는지 확인
        config_check = self.check_branch_config(seat, user)

        if config_check is False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # 사용가능한 열람실인지 확인
        if self.is_usable_room(seat) is False:
            return Response(status=status.HTTP_403_FORBIDDEN)

        # 현재 좌석이 이용불가 상태가 아닌지 확인
        if self.is_usable_seat(seat) is False:
            return Response(status=status.HTTP_403_FORBIDDEN)

        # 현재 좌석에 누가 이용중인지 확인
        is_empty = self.is_empty_seat(seat)
        if is_empty is False:
            return Response(status=status.HTTP_403_FORBIDDEN)

        elif is_empty is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # 사용자가 사용하고 있는 좌석이 있는지 확인하고 있으면 반납처리하고 다시 잡을 것
        if self.seat_before_return(user):
            return self.allocate(user, seat)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ReturnSeat(APIView):
    # 좌석 반납, 슈퍼유저기능 포함
    def post(self, request, user_id, format=None):

        creator = request.user

        try:
            user = user_models.User.objects.get(id=user_id)
        except user_models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if creator != user:
            if request.user.is_superuser is False:
                if request.user.is_staff is False:
                    return Response(status=status.HTTP_403_FORBIDDEN)

        # 잡혀져 있는 좌석이 있는지 확인

        try:
            user_recent_logs = models.Log.objects.filter(user=user)[:1]
        except models.Log.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_recent_log = user_recent_logs[0]

        allocate_action = models.Action.objects.get(en_substance='allocation')
        return_action = models.Action.objects.get(en_substance='return')
        return_seat_image = models.SeatImage.objects.get(action=return_action)

        if allocate_action != user_recent_log.action:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

        new_return = models.Log.objects.create(
            action=return_action,
            user=user,
            seat=user_recent_log.seat,
            seat_image=return_seat_image)

        new_return.save()

        return Response(status=status.HTTP_201_CREATED)
