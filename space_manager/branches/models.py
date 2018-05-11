from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from space_manager.branches import models as branch_models
from django.core.exceptions import ValidationError
from pprint import pprint


@python_2_unicode_compatible
class Branch(models.Model):
    def validate_image(fieldfile_obj):
        filesize = fieldfile_obj.file.size
        # megabyte_limit = 2.0
        kilobyte_limit = 1000.0
        if filesize > kilobyte_limit * 1024:
            raise ValidationError(
                "Max file size is %sKB" % str(kilobyte_limit))

    """ Branch Model """

    branch_num = models.IntegerField()
    region = models.CharField(max_length=140, null=True)
    branch_name = models.CharField(max_length=140, null=True)
    address = models.CharField(max_length=140, null=True)
    detail_address = models.CharField(max_length=140, null=True)
    lat = models.FloatField()
    lng = models.FloatField()
    lounge_img = models.ImageField(null=True, validators=[validate_image])
    lounge_img_cabinet = models.ImageField(
        null=True, validators=[validate_image])
    minimap_img = models.ImageField(null=True, validators=[validate_image])
    usable = models.BooleanField(default=False)
    width = models.FloatField(null=True)
    height = models.FloatField(null=True)

    def __str__(self):
        return ('{}({}호점)').format(self.branch_name, self.branch_num)

    class Meta:
        ordering = ['branch_num']


@python_2_unicode_compatible
class BranchConfig(models.Model):
    """ Branch Config Model """

    branch = models.ForeignKey(
        branch_models.Branch, null=True, related_name='config')
    man_acceptable = models.BooleanField(default=True)
    woman_acceptable = models.BooleanField(default=True)
    girl_acceptable = models.BooleanField(default=True)
    boy_acceptable = models.BooleanField(default=True)
    other_acceptable = models.BooleanField(default=True)

    def __str__(self):
        return '{}호점 - {}'.format(self.branch.branch_num,
                                  self.branch.branch_name)


@python_2_unicode_compatible
class BranchIp(models.Model):
    """ Branch IP Model """

    branch = models.ForeignKey(
        branch_models.Branch, null=True, related_name='ips')
    ip = models.CharField(max_length=140, null=True)

    def __str__(self):
        return '{}호점 - {}'.format(self.branch, self.ip)
