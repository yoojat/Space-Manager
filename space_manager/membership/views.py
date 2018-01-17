from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers

class ListAllMemberships(APIView):

    def get(self, request, format=None):

        all_memberships = models.Membership.objects.all()

        serializer = serializers.MembershipSerializer(all_memberships, many=True)

        return Response(data=serializer.data)
