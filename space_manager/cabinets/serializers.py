from rest_framework import serializers
from . import models


class InputCabinetSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CabinetSet
        fields = (
            'width',
            'height',
            'order',
            'desc',
        )


class CabinetSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CabinetSet
        fields = (
            'width',
            'height',
            'order',
            'desc',
            'branch',
            'cabinets',
        )


class InputCabinetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Cabinet
        fields = (
            'cabinet_number',
            'cabinet_set',
            'xpos',
            'ypos',
        )


class UsecabSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UseCabinet
        fields = (
            'cabinet',
            'payment',
            'user',
            'start_date',
            'end_date',
            'is_usable',
            'is_clean',
        )


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CabinetHistory
        fields = (
            'user',
            'cabinet',
            'start_date',
            'end_date',
            'cabinet_action',
        )


class InputCabLockSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CabinetLock
        fields = (
            'lock_number',
            'lock_password',
            'cabinet',
        )


class CabLockSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CabinetLock
        fields = (
            'branch',
            'lock_number',
            'lock_password',
            'cabinet',
        )