from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.UserCreateView.as_view(), name="register"),
    path("token/", views.CreateTokenView.as_view(), name="token"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
    path(
        "password_change/", views.ChangePasswordView.as_view(), name="password_change"
    ),
]
