# #!/usr/bin/env python
# """Django's command-line utility for administrative tasks."""
# import os
# from dotenv import load_dotenv
# load_dotenv()
# import sys


# def main():
#     """Run administrative tasks."""
#     os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
#     try:
#         from django.core.management import execute_from_command_line
#     except ImportError as exc:
#         raise ImportError(
#             "Couldn't import Django. Are you sure it's installed and "
#             "available on your PYTHONPATH environment variable? Did you "
#             "forget to activate a virtual environment?"
#         ) from exc
#     execute_from_command_line(sys.argv)


# if __name__ == '__main__':
#     main()



# #!/usr/bin/env python
# """Django's command-line utility for administrative tasks."""

# import os
# import sys
# from dotenv import load_dotenv

# # Get the path to the project root (parent folder of backend)
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# # Load the .env file from the project root
# load_dotenv(os.path.join(BASE_DIR, '.env'))

# def main():
#     """Run administrative tasks."""
#     os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
#     try:
#         from django.core.management import execute_from_command_line
#     except ImportError as exc:
#         raise ImportError(
#             "Couldn't import Django. Are you sure it's installed and "
#             "available on your PYTHONPATH environment variable? Did you "
#             "forget to activate a virtual environment?"
#         ) from exc
#     execute_from_command_line(sys.argv)

# if __name__ == '__main__':
#     main()


# #!/usr/bin/env python
# """Django's command-line utility for administrative tasks."""
# import os
# import sys
# from dotenv import load_dotenv

# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# load_dotenv(os.path.join(BASE_DIR, '.env'))

# def main():
#     """Run administrative tasks."""
#     os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
#     try:
#         from django.core.management import execute_from_command_line
#     except ImportError as exc:
#         raise ImportError(
#             "Couldn't import Django. Are you sure it's installed and "
#             "available on your PYTHONPATH environment variable? Did you "
#             "forget to activate a virtual environment?"
#         ) from exc
#     execute_from_command_line(sys.argv)

# if __name__ == '__main__':
#     main()



#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""

import os
import sys
import environ  # using django-environ

# Get the path to the project root (parent folder of backend)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Initialize environment variables
env = environ.Env()

# If your .env is in the project root:
# env_file = os.path.join(BASE_DIR, '.env')

# If your .env is global, set the full path here:
env_file = env_file = os.path.join(BASE_DIR, '.env')


# Load the .env file
if os.path.exists(env_file):
    env.read_env(env_file)

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
