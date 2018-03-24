from django.db import models
from space_manager.users import models as user_models
from space_manager.branches import models as branch_models
from space_manager.rooms import models as room_models
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class TimeStampModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)  #모델이 처음 만들어 질 때
    updated_at = models.DateTimeField(auto_now=True)  #저장될 때 (save)

    class Meta:
        abstract = True


class Action(models.Model):
    """ Action Model """
    en_substance = models.CharField(max_length=45, null=True)
    kr_substance = models.CharField(max_length=45, null=True)

    def __str__(self):
        return '{}({})'.format(self.en_substance, self.kr_substance)


class SeatImage(models.Model):

    GENDER_CHOICES = (('male', 'Male'), ('female', 'Female'),
                      ('not-specified', 'Not-specified'))

    file = models.ImageField()
    gender = models.CharField(max_length=80, choices=GENDER_CHOICES, null=True)
    action = models.ForeignKey(Action, null=True)

    def __str__(self):
        return '{} : {}'.format(self.gender, self.action)


@python_2_unicode_compatible
class Seat(models.Model):
    """ Seat Model """

    seat_number = models.IntegerField()
    left = models.FloatField()
    top = models.FloatField()
    rotate = models.FloatField()
    usable = models.BooleanField(default=True)
    discard = models.BooleanField(default=False)
    room = models.ForeignKey(room_models.Room, null=True, related_name='seats')
    branch = models.ForeignKey(
        branch_models.Branch, null=True, related_name='seats')
    now_using = models.BooleanField(default=False)
    seat_image = models.ForeignKey(SeatImage, null=True)

    def __str__(self):
        return ('{} - {}').format(self.branch, self.seat_number)

    class Meta:
        ordering = ['branch', 'room__room_number', 'seat_number']


class Log(TimeStampModel):
    """ Log Model """
    action = models.ForeignKey(Action)
    user = models.ForeignKey(user_models.User, null=True, blank=True)
    seat = models.ForeignKey(Seat, related_name='logs')
    seat_image = models.ForeignKey(SeatImage, null=True)

    def __str__(self):
        return '{} - {}:{}'.format(self.action, self.seat, self.user)

    class Meta:
        ordering = ['-created_at']
