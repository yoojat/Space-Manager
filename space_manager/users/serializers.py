from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from space_manager.membership import models as membership_models
from . import models


class MembershipSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    end_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = membership_models.Membership
        fields = ('id', 'branch', 'start_date', 'end_date', 'is_usable',
                  'created_at', 'updated_at')


class UserDetailSerializer(serializers.ModelSerializer):

    memberships = MembershipSerializer(many=True)

    class Meta:
        model = models.User
        fields = ('username', 'name', 'gender', 'is_staff', 'birth',
                  'is_superuser', 'id', 'profile_image', 'phone',
                  'memberships', 'created_at', 'updated_at')


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('username', 'name', 'gender', 'is_staff', 'birth',
                  'is_superuser', 'id', 'profile_image', 'phone')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = '__all__'


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('name', 'username')


class SignUpSerializer(RegisterSerializer):

    name = serializers.CharField(required=True, write_only=True)

    def get_cleaned_data(self):
        return {
            'name': self.validated_data.get('name', ''),
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        user.save()
        return user