from django.db import models
from space_manager.users import models as user_models
from space_manager.branches import models as branch_models
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class TimeStampedModel(models.Model):
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


@python_2_unicode_compatible
class Membership(TimeStampedModel):
    
    """ Membership Model """

    user = models.ForeignKey(user_models.User)
    branch = models.ForeignKey(branch_models.Branch, null=True, related_name='memberships')
    start_date= models.DateTimeField()
    end_date = models.DateTimeField()
    is_usable = models.BooleanField(default=True)
    creator = models.ForeignKey(user_models.User, null=True, related_name='memberships')

    def __str__(self):
        return '{} : {} - {}'.format(self.user, self.start_date, self.end_date)

    class Meta:
        ordering = ['-created_at']


@python_2_unicode_compatible
class Action(models.Model):
    
    """ Action Model """

    substance = models.CharField(max_length=45, null=True)

    def __str__(self):
        return self.substance


@python_2_unicode_compatible
class MembershipHistory(TimeStampedModel):
    
    """ Membership History Model """

    user = models.ForeignKey(user_models.User, null=True)
    start_date= models.DateTimeField()
    end_date = models.DateTimeField()
    branch = models.ForeignKey(branch_models.Branch, null=True)
    action = models.ForeignKey(Action, null=True)
    membership = models.ForeignKey(Membership, null=True)

    def __str__(self):
        return '{} - {} - {}'.format(self.user, self.action, self.created_at)

    class Meta:
        ordering = ['-created_at']

