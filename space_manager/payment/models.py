from django.db import models
from space_manager.membership import models as membership_models
from space_manager.users import models as user_models
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class TimeStampModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)  #모델이 처음 만들어 질 때
    updated_at = models.DateTimeField(auto_now=True)  #저장될 때 (save)

    class Meta:
        abstract = True


@python_2_unicode_compatible
class EnrollType(models.Model):
    """ Enroll Type Model """

    en_substance = models.CharField(max_length=45, null=True)
    kr_substance = models.CharField(max_length=45, null=True)

    def __str__(self):
        return '{}({})'.format(self.en_substance, self.kr_substance)


@python_2_unicode_compatible
class CostType(models.Model):
    """ Cost Type Model """
    title = models.CharField(max_length=45, null=True)
    days = models.IntegerField(null=True, blank=True)
    cost = models.IntegerField(null=True, blank=True)
    enroll_type = models.ForeignKey(EnrollType, null=True)
    cost_type = models.CharField(max_length=45, null=True)

    def __str__(self):
        return '{} : {}일 - {}원'.format(self.enroll_type, self.days, self.cost)


@python_2_unicode_compatible
class PaymentMethod(models.Model):
    """ Payment Method Model """

    substance = models.CharField(max_length=45, null=True)
    kr_substance = models.CharField(max_length=45, null=True)

    def __str__(self):
        return '{}({})'.format(self.substance, self.kr_substance)


@python_2_unicode_compatible
class PaymentHistory(membership_models.TimeStampedModel):
    """ Payment History Model """

    user = models.ForeignKey(user_models.User, null=True)
    cost_type = models.ForeignKey(CostType, null=True)
    cost_value = models.IntegerField(null=True)
    payment_method = models.ForeignKey(PaymentMethod, null=True)
    is_usable = models.BooleanField(default=True)
    creator = models.ForeignKey(
        user_models.User, related_name='creator', null=True)

    def __str__(self):
        return '{}_{}_{}_{} by {}'.format(self.user, self.cost_type,
                                          self.cost_value, self.payment_method,
                                          self.creator)

    class Meta:
        ordering = ['-created_at']


@python_2_unicode_compatible
class OnlyYou(TimeStampModel):
    """ Only You Model """

    user = models.ForeignKey(user_models.User, null=True)
    cost_value = models.IntegerField(null=True)
    is_complete = models.BooleanField(default=False)

    def __str__(self):
        return '{} - {} - {}'.format(self.user, self.cost_value,
                                     self.is_complete)

    class Meta:
        ordering = ['-created_at']


@python_2_unicode_compatible
class Basket(TimeStampModel):
    """ Basket Model """

    user = models.ForeignKey(user_models.User, null=True)
    cost_type = models.ForeignKey(CostType, null=True)

    def __str__(self):
        return '{} - {}'.format(self.user, self.cost_type)

    class Meta:
        ordering = ['-created_at']