from email import message
from rest_framework.generics import ListCreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from django.core.mail import send_mail
from .serializers import ProgramSerializer, ProgramEnrollmentSerializer
from .models import Program, ProgramEnrollment
from .utils import get_age


class ProgramListCreateAPIView(ListCreateAPIView):
    serializer_class = ProgramSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    queryset = Program.objects.all()


class ProgramDeleteAPIView(DestroyAPIView):
    serializer_class = ProgramSerializer
    permission_classes = [IsAdminUser]
    queryset = Program.objects.all()


class ProgramEnrollmentListCreateAPIView(ListCreateAPIView):
    serializer_class = ProgramEnrollmentSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    queryset = ProgramEnrollment.objects.all()


class ProgramEnrollmentUpdateAPIView(UpdateAPIView):
    serializer_class = ProgramEnrollmentSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    queryset = ProgramEnrollment.objects.all()

    def perform_update(self, serializer):
        instance = serializer.save()
        message = f'Your application for program {instance.program.program_name} has been '
        if instance.status == 'approved':
            message += 'approved.'
        elif instance.status == 'rejected':
            message += 'rejected.'
        send_mail('Registration Status', message, 'testdemo175@gmail.com',
                  [instance.user.email],  fail_silently=False,)


class ProgramRegisterView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    queryset = Program.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        user = self.request.user
        age = get_age(user.dob)
        if age <= instance.to_age and age >= instance.from_age:
            send_mail('Program Registration', f'You have successfully applied for the program {instance.program_name}. After reviewing your application, we will confirm your registration.', 'testdemo175@gmail.com',
                      [user.email],  fail_silently=False,)
            return Response(data={"message": "Registered Successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response(data={"message": f"Age must be between {instance.from_age}-{instance.to_age}"}, status=status.HTTP_400_BAD_REQUEST)
