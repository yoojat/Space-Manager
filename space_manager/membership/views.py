from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers

class ListAllMemberships(APIView):

    def get(self, request, format=None):
        
        all_memberships = models.Membership.objects.all()

        serializer = serializers.MembershipSerializer(all_memberships, many=True)

        return Response(data=serializer.data)


class ListAllMembershipHistory(APIView):

    def get(self, request, format=None):

        all_membership_history = models.MembershipHistory.objects.all()

        serializer = serializers.MembershipHistorySerializer(all_membership_history, many=True)

        return Response(data=serializer.data)

class ListAllActions(APIView):

    def get(self, request, format=None):
    
        all_actions = models.Action.objects.all()

        serializer = serializers.ActionSerializer(all_actions, many=True)

        return Response(data=serializer.data)