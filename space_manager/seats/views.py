from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from space_manager.rooms import models as rooms_models
from space_manager.membership import models as membership_models
from space_manager.branches import models as branch_models
from space_manager.users import models as user_models
from rest_framework import status
from datetime import datetime, timedelta
from random import *
from operator import eq


class NowUsing(APIView):
    # 현재 사용하고 있는 좌석 가져오기

    def get(self, request, format=None):
        user = request.user

        last_log = models.Log.objects.latest()  # 로그중 가장 최근 데이터를 가지고 옴

        serializer = serializers.LogSerializer(last_log)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


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

    # 멤버쉽 가져오기
    def get_memberships(self, user):

        now = datetime.today()
        try:
            membership = membership_models.Membership.objects.filter(
                end_date__gte=now,  #맴버쉽 만료시각이 현재보다 크고
                start_date__lte=now,  # 시작시간이 현재보다 작고
                is_usable=True,  #이용가능하고
                user=user)

            return membership

        except membership_models.Membership.DoesNotExist:
            return None

    # 성별에 따른 좌석 이용 가능여부 체크
    def can_user_seat(self, user, seat):
        gender = user.gender

        if gender == 'male':  # 유저가 남자일 경우
            if seat.for_who.male_available:
                return True
            else:
                return False

        elif gender == 'female':
            if seat.for_who.female_available:
                return True
            else:
                return False

    #사용 가능한 좌석인지 체크
    def is_usable_seat(self, seat):
        usable = seat.usable
        discard = seat.discard

        if usable is True and discard is False:
            return True
        else:
            return False

    # 비어있는 좌석 체크(now_user가 없거나 24시간이 지났거나)
    def is_empty_seat(self, seat):
        if (seat.end_datetime is None):
            return True

        elif (seat.now_user is not None
              and seat.end_datetime > datetime.now()):
            return False
        else:
            return True

    def is_usable_room(self, seat):
        room = seat.room
        if room.usable is False:
            return False
        else:
            return True

    def seat_before_return(self, user):

        #사용자의 가장 최근 좌석 이용 기록 가져오기
        try:
            user_recent_log = models.Log.objects.filter(
                user=user).latest('created_at')

        #좌석 이용기록이 하나도 없으면 처음 자리 잡음으로 그전에 자리 잡은 자리가 없음, True 리턴
        except models.Log.DoesNotExist:
            return True

        #반납 액션 가져오기
        try:
            return_action = models.Action.objects.get(en_substance='return')
        except models.Action.DoesNotExist:
            return False

        #사용자의 가장 최근 좌석 이용 기록이 반납이라면 처음 자리 잡는 것으로 확인, True리턴 => 변수 배정하고 반납하지 않은채 이용시간이 자나갈수 있음
        #
        if user_recent_log.action == return_action:
            return True
        elif user_recent_log.reg_datetime + timedelta(hours=24) < datetime.now(
        ):  # 배정하고 반납하지 않은채 이용시간이 지나간 경우, 처음 자리 잡는 걸로
            return True

        # 프론트 단에서 시간이 지난 좌석일 경우 빈좌석으로 표시

        #이전에 잡은 자리가 있음, 빈좌석 이미지를 가지고 옴
        try:
            seat_return_image = models.SeatImage.objects.get(
                action=return_action)
        except models.SeatImage.DoesNotExist:
            return False

        #반납 기록 로그 생성
        new_log = models.Log.objects.create(
            action=return_action,
            user=user,
            seat=user_recent_log.seat,
            reg_datetime=datetime.now())

        result = new_log.save()

        self.set_seat_state(user_recent_log.seat, user, seat_return_image,
                            datetime.now())

        return True

    def set_seat_state(self, seat, user, seat_image, sel_datetime):

        seat.now_user = user
        seat.seat_image = seat_image
        seat.end_datetime = sel_datetime
        seat.save()

    def allocate(self,
                 user,
                 seat,
                 end_datetime=datetime.now() + timedelta(hours=24)):

        # 배정 액션 얻기
        try:
            allocate_action = models.Action.objects.get(
                en_substance='allocation')
        except models.Action.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        seat_images = models.SeatImage.objects.filter(gender=user.gender)

        count_images = len(seat_images)
        rand_limit = count_images - 1
        random_image_number = randint(0, rand_limit)
        sel_image = seat_images[random_image_number]

        # 새 배정 기록 록그 생성
        new_log = models.Log.objects.create(
            action=allocate_action,
            user=user,
            seat=seat,
            reg_datetime=datetime.now())

        new_log.save()

        # 좌석 상태 배정상태로 변경
        self.set_seat_state(seat, user, sel_image, end_datetime)

        return Response(status=status.HTTP_201_CREATED)

    def post(self, request, seat_id, user_id, format=None):

        # 기본 좌석 마감시각
        # 멤버쉽 등록기간이 좌석 마감시각보다 작을 경우 멤버쉽 마감시각으로 변경
        e_datetime = datetime.now() + timedelta(hours=24)

        creator = request.user
        # creator는 본인이 될수도 있고 superuser or staff가 될수도 있음

        user = user_models.User.objects.get(id=user_id)

        # 해당 좌석 찾기
        try:
            seat = models.Seat.objects.get(
                id=seat_id, usable=True, discard=False)
            # find out by id, usable, discard
        except models.Seat.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # 성별에 따른 좌석 이용 가능여부 체크
        if self.can_user_seat(user, seat) is False:
            return Response(status=status.HTTP_403_FORBIDDEN)

        # 해당 좌석이 이용불가 상태 혹은 폐기 상태가 아닌지 확인
        if self.is_usable_seat(seat) is False:
            return Response(status=status.HTTP_403_FORBIDDEN)

        # 좌석이 빈좌석인지 확인(now_user가 없거나 24시간이 지났거나)
        if self.is_empty_seat(seat) is False:
            return Response(status=status.HTTP_403_FORBIDDEN)

        # 슈퍼유저인지 스탭인지 또는 본인이 맞는지 확인
        if creator.is_superuser is False or creator.is_staff is False:  #생성자가 슈퍼유저 혹은 스탭이 아니라면
            if creator != user:  #유저가 생성자 본인이 아니라면
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            else:  #유저와 생성자가 같다면(본인이 직접 배정할때)
                #멤버쉽 체크, 멤버쉽 끝나는 기간이 24시간 이내라면 종료시간을 멤버십 끝나는 시간으로
                #멤버쉽 등록할 때 잡은 자리가 있으면 24시간 뒤로 변경할 것

                #불러오는 멤버쉽 정보는 제일 최근 정보만 가져옴
                #예를 들면 5월1일, 6월 1일에 등록한 멤버쉽 있으면 5월달 것을 먼저 불러옴(현재 5월 가정)
                memberships = self.get_memberships(user)

                print(memberships)

                if memberships is None:  #맴버쉽에 등록되어있지 않을 때
                    return Response(status=status.HTTP_406_NOT_ACCEPTABLE
                                    )  # 프론트단에서 멤버쉽 등록창으로 리다이렉트
                elif len(memberships) == 0:  #현재 사용가능한 맴버쉽이 남아 있지 않을 때
                    return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

                #멤버쉽 만료기간이 24시간 이내로 남지 않았다면(하루등록 이용자도 포함)
                if memberships[0].end_date < (
                        datetime.now() + timedelta(hours=24)):

                    if len(memberships) > 1:  #다음 멤버쉽이 하나 더 이상 있다면

                        #현재 맴버쉽 만료시각보다 다음 맴버쉽 시작 시간이 더크다면
                        if memberships[0].end_date < memberships[1].start_date:
                            e_datetime = memberships[0].end_date

                        # 다음 멤버쉽 만료시각이 기본 좌석 만료시각보다 크다면 24시간
                        # 그렇지 않다면 다음 맴버쉽 만료시각도 체크하고 다음 멤버쉽도

                        elif memberships[1].end_date < datetime.now(
                        ) + timedelta(hours=24):
                            # 다음 멤버쉽 만료시각이 기본 좌석 만료시각 보다 작다면 다음 멤버쉽 만료시각으로
                            e_datetie = memberships[1].end_date

                    else:  #다음 멤버쉽이 없다면 현재 맴버쉽의 만료시각으로
                        e_datetime = memberships[0].end_date

                #멤버쉽중 만료시각 가장 최근것으로 불러옴

        # allocation action 찾기, log에 기록할 때 필요함
        try:
            allocate_action = models.Action.objects.get(
                en_substance='allocation')
        except models.Action.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        #########################################################

        # 성별을 통한 배정 이미지 찾기
        if user.gender is None:
            seat_images = models.SeatImage.objects.exclude(
                gender='Not-specified')
        else:
            seat_images = models.SeatImage.objects.filter(gender=user.gender)

        count_images = len(seat_images)
        rand_limit = count_images - 1
        random_image_number = randint(0, rand_limit)
        sel_image = seat_images[random_image_number]  #선택된 이미지

        # end_time = datetime.now() + timedelta(hours=24)  #오늘 날짜시간 +24시간

        # 열람실 설정에 이상 없는지 확인
        if self.is_usable_room(seat) is False:
            return Response(status=status.HTTP_403_FORBIDDEN)

        # 배정전 잡은자리 있으면 반납처리
        if self.seat_before_return(user) is False:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return self.allocate(user, seat)  # 배정


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
