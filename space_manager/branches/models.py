from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from space_manager.branches import models as branch_models

@python_2_unicode_compatible
class Branch(models.Model):
    
    """ Branch Model """

    branch_num = models.IntegerField()
    region = models.CharField(max_length=140, null=True)
    branch_name = models.CharField(max_length=140, null=True)
    address = models.CharField(max_length=140, null=True)
    detail_address = models.CharField(max_length=140, null=True)
    lat = models.FloatField()
    lng = models.FloatField()

    def __str__(self):
        return ('{}호점 - {}').format(self.branch_num, self.branch_name)


@python_2_unicode_compatible
class BranchConfig(models.Model):
    
    """ Branch Config Model """

    branch = models.ForeignKey(branch_models.Branch, null=True)
    man_usable = models.BooleanField(default=True)
    woman_usable = models.BooleanField(default=True)
    girl_usable = models.BooleanField(default=True)
    boy_usable = models.BooleanField(default=True)
    other_usable = models.BooleanField(default=True)

    def __str__(self):
        return '{}호점 - {}'.format(self.branch.branch_num, self.branch.branch_name)
