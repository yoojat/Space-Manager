from . import models, serializers
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView


class GetMembersByKeywords(APIView):
    def get(self, request, format=None):

        keyword = request.GET.get('keyword')
        if (keyword is None) or (str(keyword).strip() == ''):
            target_users = models.User.objects.none()

        else:
            target_users = models.User.objects.filter(
                name__contains=keyword) | models.User.objects.filter(
                    username__contains=keyword) | models.User.objects.filter(
                        phone__contains=keyword)

        serializer = serializers.SearchedUserSerializer(
            target_users, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UserStatus(APIView):
    # def get_user(self, id):
    #     try:
    #         found_user = models.User.objects.get(id=id)
    #         return found_user
    #     except models.User.DoesNotExist:
    #         return None

    def get(self, request, format=None):

        serializer = serializers.UserProfileSerializer(request.user)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class SimpleUserById(APIView):
    def get_user(self, id):
        try:
            found_user = models.User.objects.get(id=id)
            return found_user
        except models.User.DoesNotExist:
            return None

    def get(self, request, userid, format=None):

        found_user = self.get_user(userid)

        serializer = serializers.UserProfileSerializer(found_user)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UserByID(APIView):
    def get_user(self, id):
        try:
            found_user = models.User.objects.get(id=id)
            return found_user
        except models.User.DoesNotExist:
            return None

    def get(self, request, userid, format=None):

        found_user = self.get_user(userid)

        serializer = serializers.UserDetailSerializer(found_user)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UserProfile(APIView):
    def get_user(self, username):

        try:
            found_user = models.User.objects.get(username=username)
            return found_user
        except models.User.DoesNotExist:
            return None

    def get(self, request, username, format=None):

        found_user = self.get_user(username)

        if found_user is None:

            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.UserProfileSerializer(found_user)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, username, format=None):

        user = request.user

        found_user = self.get_user(username)

        if found_user is None:

            return Response(status=status.HTTP_404_NOT_FOUND)

        elif found_user.username != user.username:

            return Response(status=status.HTTP_400_BAD_REQUEST)

        else:

            serializer = serializers.UserProfileSerializer(
                found_user, data=request.data, partial=True)

            if serializer.is_valid():

                serializer.save()

                return Response(
                    data=serializer.data, status=status.HTTP_200_OK)

            else:

                return Response(
                    data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePassword(APIView):
    def put(self, request, username, format=None):

        user = request.user

        if user.username == username:

            current_password = request.data.get('current_password', None)

            if current_password is not None:

                passwords_match = user.check_password(current_password)

                if passwords_match:

                    new_password = request.data.get('new_password', None)

                    if new_password is not None:

                        user.set_password(new_password)

                        user.save()

                        return Response(status=status.HTTP_200_OK)

                    else:

                        return Response(status=status.HTTP_400_BAD_REQUEST)

                else:

                    return Response(status=status.HTTP_400_BAD_REQUEST)

            else:

                return Response(status=status.HTTP_400_BAD_REQUEST)

        else:

            return Response(status=status.HTTP_401_UNAUTHORIZED)


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
