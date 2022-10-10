from django.urls import path
from . import views

urlpatterns = [
    path('programs/', views.ProgramListCreateAPIView.as_view(), name='programs'),
    path('programs/<int:pk>/', views.ProgramDeleteAPIView.as_view(),
         name='delete_program'),
    path('enrollments/', views.ProgramEnrollmentListCreateAPIView.as_view(),
         name='enrollments'),
    path('enrollments/<int:pk>/', views.ProgramEnrollmentUpdateAPIView.as_view(),
         name='enrollment_update'),
    path('register/<int:pk>/', views.ProgramRegisterView.as_view(), name='register'),
]
