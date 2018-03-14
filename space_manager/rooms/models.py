from django.db import models
from space_manager.branches import models as branches_model

from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class RoomType(models.Model):
    """ Room Type Model """

    en_substance = models.CharField(max_length=45, null=True)
    kr_substance = models.CharField(max_length=45, null=True)

    def __str__(self):
        return '{}'.format(self.kr_substance)


@python_2_unicode_compatible
class Room(models.Model):
    """ Room Model """
    branch = models.ForeignKey(
        branches_model.Branch, related_name='rooms', null=True)
    room_number = models.IntegerField(null=True)
    room_type = models.ForeignKey(RoomType, null=True)
    width = models.FloatField(null=True)
    height = models.FloatField(null=True)
    left = models.FloatField(null=True)
    top = models.FloatField(null=True)
    usable = models.BooleanField(default=True)

    def __str__(self):
        return '{}열람실({})'.format(self.room_number, self.room_type)

    class Meta:
        ordering = ['room_number']
