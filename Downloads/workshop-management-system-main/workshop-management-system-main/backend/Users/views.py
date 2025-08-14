from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils.timezone import now
from .models import UserActivity, WKSPUser
from django.http import JsonResponse
from rest_framework_simplejwt.authentication import JWTAuthentication

class SignupView(APIView):
    permission_classes = [AllowAny]  # Ensure everyone can access signup
    
    def post(self, request):
        username = request.data.get("username")
        mepssno = request.data.get("mepssno")

        # Check if username or email already exists
        if WKSPUser.objects.filter(username=username).exists():
            return Response({"error": "Username already taken"}, status=400)

        if WKSPUser.objects.filter(mepssno=mepssno).exists():
            return Response({"error": "ME/PSS No already registered"}, status=400)

        # If user does not exist, proceed with serialization and saving
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=201)
        return Response(serializer.errors, status=400)

class LoginView(APIView):
    permission_classes = [AllowAny]  # Allow public access
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            
            # Log login time
            UserActivity.objects.create(user=user, username=user.username, 
                login_time=now(), 
                access_token=str(refresh.access_token),
                refresh_token=str(refresh)
            )
            
            response = Response({'username': user.username, 'user_id': user.id}, status=200)

            # Set HttpOnly cookies
            response.set_cookie(
                key="access_token",
                value=str(refresh.access_token),
                httponly=True,
                secure=False,  # use True in production with HTTPS
                samesite="Lax"
            )
            response.set_cookie(
                key="refresh_token",
                value=str(refresh),
                httponly=True,
                secure=False,
                samesite="Lax"
            )

            return response
        return Response({'error': 'Invalid credentials'}, status=400)
    
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"username": request.user.username})

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        if user.is_authenticated:
            try:
                # Update logout time for the latest activity
                activity = UserActivity.objects.filter(user=user, logout_time__isnull=True).last()
                if activity:
                    activity.logout_time = now()
                    if activity.valid_token == True:
                        activity.valid_token = False
                    activity.save()
                    
                logout(request)
                response = JsonResponse({'message': 'Logged out successfully!'})
                response.delete_cookie('access_token')
                response.delete_cookie('refresh_token')
                return response
            except Exception as e:
                return Response({'error': str(e)}, status=400)
        else:
            return Response({'message': 'User not authenticated'})
