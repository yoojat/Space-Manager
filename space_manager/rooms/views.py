from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from space_manager.branches import models as branch_model
from rest_framework import status

# Create your views here.


class Rooms(APIView):
    def post(self, request, branch_id, format=None):
        # 제목 : 열람실 추가하기
        # 설명 : 해당 지점에 열람실을 추가
        # 데이터
        # branch,room_number,room_type,width,height,left,top

        user = request.user

        # 슈퍼 유저인지 검사
        if (user.is_superuser == False):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        try:
            branch = branch_model.Branch.objects.get(id=branch_id)
        except branch_model.Branch.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        data = request.data
        data['branch'] = branch_id

        serializer = serializers.InputRoomSerializer(data=data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                data=serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, branch_id, format=None):
        # 제목 : 해당지점 열람실 모두 가지고 오기
        # 설명 : 해당 지점에 있는 열람실 모두 가지고 오기
        # 데이터
        # branch,room_number,room_type,width,height,left,top, usable, seats

        try:
            branch = branch_model.Branch.objects.get(id=branch_id)
        except branch_model.Branch.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        rooms = models.Room.objects.filter(branch=branch)

        serializer = serializers.RoomSerializer(rooms, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class RoomTypes(APIView):
    def get(self, request, format=None):
        # 제목 : 열람실 타입 가지고 오기
        # 설명 : 열람실 타입 가지고 오기, 열람실 추가할 때 이용
        # 데이터
        # id, en_substance, kr_substance

        room_types = models.RoomType.objects.all()

        serializer = serializers.RoomTypeSerializer(room_types, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class Room(APIView):
    def find_room(self, room_id):
        try:
            room = models.Room.objects.get(id=room_id)
            return room
        except models.Room.DoesNotExist:
            return None

    def get(self, request, room_id, format=None):
        # 제목 : 특정 열람실 가지고 오기
        # 데이터
        # branch,room_number,room_type,width,height,left,top, usable, seats

        room = self.find_room(room_id)

        if room is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.RoomSerializer(room)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, room_id, format=None):
        # 제목 : 특정 열람실 수정하기
        # 데이터
        # branch,room_number,room_type,width,height,left,top, usable, seats
        user = request.user

        # 슈퍼 유저인지 검사
        if (user.is_superuser == False):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        room = self.find_room(room_id)

        if room is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.RoomSerializer(
            room, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(
                data=serializer.data, status=status.HTTP_202_ACCEPTED)

        else:
            return Response(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, room_id, format=None):
        # 제목 : 특정 열람실 삭제하기
        # 데이터
        # 없음

        user = request.user

        # 슈퍼 유저인지 검사
        if (user.is_superuser == False):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        room = self.find_room(room_id)

        if room is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        room.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
