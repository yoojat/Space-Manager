from django.contrib.auth.models import AbstractUser
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _
from space_manager.branches import models as branch_models


@python_2_unicode_compatible
class InflowRoute(models.Model):
    """ InfolowRoute Model """

    substance = models.CharField(max_length=45, null=True)

    def __str__(self):
        return self.substance


@python_2_unicode_compatible
class Purpose(models.Model):
    """ Purpose Model """

    substance = models.CharField(max_length=45, null=True)

    def __str__(self):
        return self.substance


@python_2_unicode_compatible
class User(AbstractUser):
    """ User Model """

    GENDER_CHOICES = (('male', 'Male'), ('female', 'Female'),
                      ('not-specified', 'Not sepcified'))

    # First Name and Last Name do not cover name patterns
    # around the globe.
    profile_image = models.ImageField(null=True)
    name = models.CharField(_('Name of User'), blank=True, max_length=255)
    website = models.URLField(null=True)
    bio = models.TextField(null=True)
    phone = models.CharField(max_length=140, null=True)
    gender = models.CharField(max_length=80, choices=GENDER_CHOICES, null=True)
    birth = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    infolow_route = models.ForeignKey(InflowRoute, null=True)
    purpose = models.ForeignKey(Purpose, null=True)
    manageable_branches = models.ManyToManyField(branch_models.Branch)

    def __str__(self):
        return '{}({})'.format(self.name, self.username)

    def get_absolute_url(self):
        return reverse('users:detail', kwargs={'username': self.username})
