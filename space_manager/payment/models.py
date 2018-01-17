from django.db import models
from space_manager.membership import models as membership_models
from space_manager.users import models as user_models
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class CostType(models.Model):
    
    """ Cost Type Model """

    substance = models.CharField(max_length=45, null=True)

    def __str__(self):
        return self.substance


@python_2_unicode_compatible
class PaymentMethod(models.Model):
    
    """ Payment Method Model """

    substance = models.CharField(max_length=45, null=True)

    def __str__(self):
        return self.substance


@python_2_unicode_compatible
class PaymentHistory(membership_models.TimeStampedModel):
    
    """ Pay History Model """

    user = models.ForeignKey(user_models.User)
    cost_type = models.ForeignKey(CostType, null=True)
    cost_value = models.IntegerField(null=True)
    payment_method = models.ForeignKey(PaymentMethod, null=True)

    def __str__(self):
        return '{} : {} - {}'.format(self.cost_value, self.user, self.cost_type)
