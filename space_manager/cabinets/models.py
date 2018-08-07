from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from space_manager.users import models as user_models
from space_manager.branches import models as branch_models
from space_manager.payment import models as payment_models

# Create your models here.


@python_2_unicode_compatible
class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        abstract = True


@python_2_unicode_compatible
class CabinetSet(models.Model):
    """ Cabinet Set Model """

    branch = models.ForeignKey(
        branch_models.Branch, null=True, related_name='cabinet_sets')
    width = models.IntegerField(null=True)
    height = models.IntegerField(null=True)
    xpos = models.FloatField(null=True)
    ypos = models.FloatField(null=True)
    order = models.IntegerField(null=True)
    desc = models.CharField(max_length=255, null=True)
    horizontal_num = models.IntegerField(null=True)
    vertical_num = models.IntegerField(null=True)

    def __str__(self):
        return '{}({}) - {}'.format(self.branch.branch_name,
                                    self.branch.branch_num, self.desc)

    class Meta:
        ordering = ['branch', 'order']


@python_2_unicode_compatible
class Cabinet(TimeStampedModel):
    """ Cabinet Model """

    cabinet_number = models.IntegerField(null=True)
    xpos = models.IntegerField(null=True)
    ypos = models.IntegerField(null=True)
    cabinet_set = models.ForeignKey(
        CabinetSet, null=True, related_name='cabinets')
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    is_usable = models.BooleanField(default=True)
    is_clean = models.BooleanField(default=True)
    user = models.ForeignKey(
        user_models.User, null=True, blank=True, related_name='cabinets')

    # 사용자가 이용하는 순간 start_date, end_date를 업데이트하고, is_clean을 False로 변경한다
    # 기간이 지나면 관리자가 정리하기 전까지 is_clean은 False상태이다
    # 사물함 정리가 완료되면 is_clean을 True로 설정하고 새 사용자를 받을수 있도록 한다
    # is_usable이 False이면 사용을 못하도록 한다(관리자가 사용중인경우, 사물함 고장인 경우)

    def __str__(self):
        return '{} : {}번 사물함'.format(
            self.cabinet_set.branch,
            self.cabinet_number,
        )

    class Meta:
        ordering = ['cabinet_number']


@python_2_unicode_compatible
class CabinetAction(models.Model):
    """ Cabinet Action Model """

    substance = models.CharField(max_length=45, null=True)
    kr_substance = models.CharField(max_length=45, null=True)

    def __str__(self):
        return self.substance


@python_2_unicode_compatible
class CabinetHistory(TimeStampedModel):
    """ Cabinet History Model """

    user = models.ForeignKey(user_models.User, related_name='cabinet_historys')
    cabinet = models.ForeignKey(
        Cabinet, null=True, related_name='cabinet_historys')
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

    branch = models.ForeignKey(
        branch_models.Branch, null=True, related_name='cabinet_locks')
    lock_number = models.IntegerField(null=True)
    lock_password = models.CharField(max_length=45, null=True)
    cabinet = models.ForeignKey(Cabinet, null=True, blank=True)

    def __str__(self):
        return '{}({}) - {}번 자물쇠'.format(
            self.branch.branch_name, self.branch.branch_num, self.lock_number)

    class Meta:
        ordering = ['lock_number']
