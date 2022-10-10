from rest_framework import serializers
from .models import Program, ProgramEnrollment
from accounts.serializers import UserSerializer


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'


class ProgramEnrollmentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    program = ProgramSerializer(read_only=True)

    class Meta:
        model = ProgramEnrollment
        fields = '__all__'
