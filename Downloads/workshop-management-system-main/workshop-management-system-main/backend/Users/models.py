from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
# from django.utils.timezone import now

class WKSPUser(AbstractUser):
    mepssno = models.CharField(max_length=100, unique=True)

class UserActivity(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    username = models.CharField(max_length=150)
    access_token = models.TextField()
    refresh_token = models.TextField()
    login_time = models.DateTimeField(null=True, blank=True)
    logout_time = models.DateTimeField(null=True, blank=True)
    valid_token = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-login_time']  # So .last() always picks latest login

    def __str__(self):
        return f"{self.username} | Login: {self.login_time} | Logout: {self.logout_time}"
