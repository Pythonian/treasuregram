from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Treasure(models.Model):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=100)
    value = models.DecimalField(max_digits=10,
                                decimal_places=2)
    material = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images',
                              default='images/default.jpg')
    likes = models.IntegerField(default=0)

    def __unicode__(self):
        return self.name
