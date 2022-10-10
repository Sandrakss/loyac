from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    email = models.EmailField(_("email address"), unique=True)
    id_number = models.CharField(max_length=50, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.username
