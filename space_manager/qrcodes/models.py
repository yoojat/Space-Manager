from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from space_manager.users import models as user_models


@python_2_unicode_compatible
class TimeStampModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)  #모델이 처음 만들어 질 때
    updated_at = models.DateTimeField(auto_now=True)  #저장될 때 (save)

    class Meta:
        abstract = True


@python_2_unicode_compatible
class QR(TimeStampModel):
    """ QR Model """

    user = models.ForeignKey(user_models.User, null=True, blank=True)
    end_date = models.DateTimeField()
    is_usable = models.BooleanField(default=True)
    qr_code_img = models.ImageField(upload_to="qr_code_img/", null=True)
    qr_str = models.CharField(max_length=140)

    def __str__(self):
        return '{} - {} : {}'.format(self.user, self.end_date, self.is_usable)


class CheckInOut(TimeStampModel):
    """ Check In Out Modle """

    CHECK_IN_OUT_CHOCIES = (
        ('check-in', 'Check-In'),
        ('check-out', 'Check-Out'),
    )

    check_in_out = models.CharField(
        max_length=140, choices=CHECK_IN_OUT_CHOCIES, null=True)
    qr = models.ForeignKey(QR)

    def __str__(self):
        return '{} - {}'.format(self.check_in_out, self.qr)

    @property
    def get_qr_str(self):
        return self.qr.qr_str
