from django.contrib.auth.models import Group
from rest_framework import serializers
from .models import WKSPUser

class UserSerializer(serializers.ModelSerializer):
    # group = serializers.CharField(write_only=True)  # For group selection

    class Meta:
        model = WKSPUser
        fields = ('username', 'mepssno', 'password')
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 6}
        }

    def create(self, validated_data):
        # group_name = validated_data.pop('group')  # Get the group name
        user = WKSPUser.objects.create_user(
            username=validated_data['username'],
            mepssno=validated_data['mepssno'],
            password=validated_data['password']
        )
        # Assign user to group
        # group = Group.objects.get(name=group_name)
        group, _ = Group.objects.get_or_create(name="User")
        user.groups.add(group)
        return user
