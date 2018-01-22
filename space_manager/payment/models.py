from django.db import models
from space_manager.membership import models as membership_models
from space_manager.users import models as user_models
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class EnrollType(models.Model):
    
    """ Enroll Type Model """

    en_substance = models.CharField(max_length = 45, null=True)
    kr_substance = models.CharField(max_length = 45, null=True)
    def __str__(self):
        return '{}({})'.format(self.en_substance, self.kr_substance)

@python_2_unicode_compatible
class CostType(models.Model):
    
    """ Cost Type Model """

    days = models.IntegerField(null=True)
    cost = models.IntegerField(null=True)
    enroll_type = models.ForeignKey(EnrollType, null=True)    

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
    cost_type = models.ForeignKey(CostType, null=True, blank=True)
    cost_value = models.IntegerField(null=True, blank=True)
    payment_method = models.ForeignKey(PaymentMethod, null=True)

    def __str__(self):
        return '{} : {} - {}'.format(self.cost_value, self.user, self.cost_type)

    class Meta:
        ordering = ['-created_at']
