from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Artwork, BlogPost
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # ✅ only allow admin/staff login
        if not self.user.is_staff:
            raise AuthenticationFailed("Only admin users can login")

        return data


class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class = AdminTokenObtainPairSerializer


# Health check
@api_view(["GET"])
def health(request):
    return Response({"status": "ok"})

# --- Public ---
@api_view(["GET"])
@permission_classes([AllowAny])
def list_artworks(request):
    category = request.query_params.get("category")
    artworks = Artwork.objects.all().order_by("-created_at")
    if category:
        artworks = artworks.filter(category=category)
    return Response([a.to_dict(request) for a in artworks])

@api_view(["GET"])
@permission_classes([AllowAny])
def get_artwork(request, art_id):
    art = get_object_or_404(Artwork, pk=art_id)
    return Response(art.to_dict(request))

@api_view(["GET"])
@permission_classes([AllowAny])
def list_blog(request):
    posts = BlogPost.objects.filter(published=True).order_by("-created_at")
    return Response([p.to_dict() for p in posts])

@api_view(["GET"])
@permission_classes([AllowAny])
def get_blog(request, slug):
    post = get_object_or_404(BlogPost, slug=slug, published=True)
    return Response(post.to_dict())

# --- Admin CRUD ---
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_artwork(request):
    # Convert is_available string to boolean
    is_available = request.data.get("is_available", True)
    if isinstance(is_available, str):
        is_available = is_available.lower() in ['true', '1', 'yes']
    
    art = Artwork.objects.create(
        title=request.data.get("title", ""),
        description=request.data.get("description", ""),
        price_inr=request.data.get("price_inr", 0),
        category=request.data.get("category", "merch"),
        is_available=is_available,
        image=request.FILES.get("image"),
    )
    return Response({"message": "created", "artwork": art.to_dict(request)})

@csrf_exempt
def admin_login(request):
    if request.method == "POST":
        body = json.loads(request.body)
        email = body.get("email")
        password = body.get("password")

        # Try authenticating with email as username
        user = authenticate(username=email, password=password)
        
        # If that fails, try finding user by email field and authenticate with username
        if not user:
            from django.contrib.auth import get_user_model
            User = get_user_model()
            try:
                user_obj = User.objects.get(email=email)
                user = authenticate(username=user_obj.username, password=password)
            except User.DoesNotExist:
                pass

        if user and user.is_staff:  # only allow admin/staff
            refresh = RefreshToken.for_user(user)
            return JsonResponse({"token": str(refresh.access_token)}, status=200)

        return JsonResponse({"error": "Invalid credentials"}, status=401)

    return JsonResponse({"error": "Invalid request"}, status=400)