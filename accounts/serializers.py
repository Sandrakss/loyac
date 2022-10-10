from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "id_number",
            "first_name",
            "last_name",
            "dob",
            "password",
            "is_staff"
        ]
        extra_kwargs = {"password": {"write_only": True,
                                     "required": True}, "username": {'read_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            **validated_data, username=validated_data.get('email').split('@')[0])
        user.save()
        Token.objects.create(user=user)
        return user


class AuthTokenSerializer(serializers.Serializer):
    """
    Serializer for the user authentication object
    """

    username = serializers.CharField()
    password = serializers.CharField(
        style={"input_type": "password"}, trim_whitespace=False
    )

    def validate(self, attrs):
        """
        Validate and authenticate the user
        """
        username = attrs.get("username")
        password = attrs.get("password")

        user = authenticate(
            request=self.context.get("request"), username=username, password=password
        )
        if not user:
            msg = _("Unable to authenticate with provided credentials")
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
