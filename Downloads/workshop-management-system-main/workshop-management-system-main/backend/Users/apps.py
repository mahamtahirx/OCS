from django.apps import AppConfig


class UsersConfig(AppConfig):
    # default_auto_field = 'django.db.models.BigAutoField'
    name = 'Users'

    # def ready(self):
    #     from django.contrib.auth.models import Group
    #     # List of roles to be created
    #     roles = ['Admin', 'User', 'Comdt', 'AD', 'OIC', 'Clerk']

    #     # Create groups if they don't exist
    #     for role in roles:
    #         Group.objects.get_or_create(name=role)
    
    def ready(self):
        from django.db.models.signals import post_migrate
        post_migrate.connect(create_groups, sender=self)

def create_groups(sender, **kwargs):
    from django.contrib.auth.models import Group
    roles = ['User', 'Comdt', 'AD', 'OIC', 'Clerk']
    for role in roles:
        Group.objects.get_or_create(name=role)
