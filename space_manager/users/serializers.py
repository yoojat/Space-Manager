from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from space_manager.branches import serializers as branch_serializers
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from space_manager.membership import models as membership_models
from space_manager.cabinets import models as cabinet_models
from . import models


class BriefCabinetSetSerializer(serializers.ModelSerializer):
    branch = branch_serializers.BranchForMembershipSerializer()

    class Meta:
        model = cabinet_models.CabinetSet
        fields = ('branch', )


class CabinetSerializer(serializers.ModelSerializer):

    cabinet_set = BriefCabinetSetSerializer()

    class Meta:
        model = cabinet_models.Cabinet
        fields = ('cabinet_number', 'xpos', 'ypos', 'id', 'start_date',
                  'cabinet_set', 'end_date', 'is_usable', 'is_clean', 'user')


class CabinetActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = cabinet_models.CabinetAction
        fields = '__all__'


class CabinetHistorySerializer(serializers.ModelSerializer):
    cabinet_action = CabinetActionSerializer()
    cabinet = CabinetSerializer()

    class Meta:
        model = cabinet_models.CabinetHistory
        fields = (
            'id',
            'cabinet',
            'start_date',
            'end_date',
            'cabinet_action',
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = '__all__'


class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = membership_models.Action
        fields = '__all__'


class MembershipHistorySerializer(serializers.ModelSerializer):

    creator = UserSerializer(read_only=True)
    action = ActionSerializer(read_only=True)

    class Meta:
        model = membership_models.MembershipHistory
        fields = (
            'id',
            'action',
            'membership',
            'creator',
        )


class SearcheMembershipSerializer(serializers.ModelSerializer):

    start_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    end_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = membership_models.Membership
        fields = (
            'id',
            'start_date',
            'end_date',
            'is_usable',
            'updated_at',
        )


class MembershipSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    end_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    membership_historys = MembershipHistorySerializer(many=True)
    branch = branch_serializers.BriefBranchSerializer()

    class Meta:
        model = membership_models.Membership
        fields = (
            'id',
            'branch',
            'start_date',
            'end_date',
            'is_usable',
            'created_at',
            'updated_at',
            'membership_historys',
        )


class SearchedUserSerializer(serializers.ModelSerializer):
    memberships = SearcheMembershipSerializer(many=True)

    class Meta:
        model = models.User
        fields = (
            'username',
            'name',
            'birth',
            'id',
            'phone',
            'memberships',
            'updated_at',
        )


class UserDetailSerializer(serializers.ModelSerializer):

    memberships = MembershipSerializer(many=True)

    cabinets = CabinetSerializer(many=True)

    cabinet_historys = CabinetHistorySerializer(many=True)

    class Meta:
        model = models.User
        fields = ('username', 'name', 'gender', 'is_staff', 'birth',
                  'is_superuser', 'id', 'profile_image', 'phone',
                  'memberships', 'created_at', 'updated_at', 'cabinets',
                  'cabinet_historys')


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('username', 'name', 'gender', 'is_staff', 'birth',
                  'is_superuser', 'id', 'profile_image', 'phone')


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