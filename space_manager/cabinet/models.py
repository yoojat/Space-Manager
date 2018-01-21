from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from space_manager.users import models as user_models
from space_manager.branches import models as branch_models

# Create your models here.


@python_2_unicode_compatible
class TimeStampedModel(models.Model):
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


@python_2_unicode_compatible
class Cabinet(models.Model):
    
    """ Cabinet Model """

    cabinet_number = models.IntegerField(null=True)
    branch = models.ForeignKey(branch_models.Branch, null=True, related_name='cabinets')
    xpos = models.IntegerField(null=True)
    ypos = models.IntegerField(null=True)

    def __str__(self):
        return '{} : {}번 사물함'.format(self.branch, self.cabinet_number,)

    class Meta:
        ordering = ['cabinet_number']


@python_2_unicode_compatible
class CabinetSet(models.Model):
    
    """ Cabinet Set Model """

    branch = models.ForeignKey(branch_models.Branch, null=True, related_name='cabinet_sets')
    width = models.IntegerField(null=True)
    height = models.IntegerField(null=True)
    order = models.IntegerField(null=True)
    desc = models.CharField(max_length=255, null=True)

    def __str__(self):
        return '{}({}) - {}'.format(self.branch.branch_name, self.branch.branch_num, self.desc)

    class Meta:
        ordering = ['branch', 'order']


@python_2_unicode_compatible
class UseCabinet(TimeStampedModel):
    
    """ Use Cabinet Model """

    cabinet = models.ForeignKey(Cabinet, null=True, related_name='UseCabs')
    user = models.ForeignKey(user_models.User)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_usable = models.BooleanField(default=True)

    def __str__(self):
        return '{} - {}번 사물함, 사용자 : {}, {} - {}'.format(self.cabinet.branch.branch_name, self.cabinet.cabinet_number, self.user, self.start_date, self.end_date)

    class Meta:
        ordering = ['-start_date']


@python_2_unicode_compatible
class CabinetAction(models.Model):
    
    """ Cabinet Action Model """

    substance = models.CharField(max_length=45, null=True)

    def __str__(self):
        return self.substance
    

@python_2_unicode_compatible
class CabinetHistory(TimeStampedModel):
    
    """ Cabinet History Model """

    user = models.ForeignKey(user_models.User)
    cabinet = models.ForeignKey(Cabinet, null=True, related_name='cabinet_historys')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    cabinet_action = models.ForeignKey(CabinetAction)

    def __str__(self):
        return '{} - {} - {}'.format(self.created_at, self.cabinet, self.user)

    class Meta:
        ordering = ['-created_at']


@python_2_unicode_compatible
class CabinetLock(models.Model):
    
    """ Cabinet Lock Model """

    branch = models.ForeignKey(branch_models.Branch, null=True, related_name='cabinet_locks')
    lock_number = models.IntegerField(null=True)
    lock_password = models.CharField(max_length=45, null=True)
    cabinet = models.ForeignKey(Cabinet, null=True, blank=True)

    def __str__(self):
        return '{}({}) - {}번 자물쇠'.format(self.branch.branch_name, self.branch.branch_num, self.lock_number)

    class Meta:
        ordering = ['lock_number']
