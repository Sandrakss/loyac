from email.policy import default
from random import choices
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Program(models.Model):
    program_image = models.ImageField(upload_to="images/programs/")
    program_name = models.CharField(max_length=50)
    from_date = models.DateField()
    to_date = models.DateField()
    from_age = models.PositiveIntegerField()
    to_age = models.PositiveIntegerField()
    program_details = models.TextField()
    program_fee = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.program_name


class EnrollmentStatus(models.TextChoices):
    PENDING = 'pending', 'Pending'
    APPROVED = 'approved', 'Approved'
    REJECTED = 'rejected', 'Rejected'


class ProgramEnrollment(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='programs')
    program = models.ForeignKey(
        Program, on_delete=models.CASCADE, related_name="enrollments")
    status = models.CharField(
        max_length=10, choices=EnrollmentStatus.choices, default=EnrollmentStatus.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email}-{self.program.program_name}"
