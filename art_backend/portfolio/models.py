from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
import uuid

class User(AbstractUser):
    is_admin = models.BooleanField(default=True)

class Artwork(models.Model):
    CATEGORY_CHOICES = [
        ("merch", "Merch"),
        ("original", "Original"),
        ("commission", "Commission"),
    ]

    title = models.CharField(max_length=160)
    description = models.TextField(blank=True)
    price_inr = models.IntegerField(default=0)
    image = models.ImageField(upload_to="artworks/", blank=True, null=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="merch")
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "price_inr": self.price_inr,
            "image_url": self.image.url if self.image else None,
            "category": self.category,
            "is_available": self.is_available,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }

class BlogPost(models.Model):
    title = models.CharField(max_length=160)
    slug = models.SlugField(unique=True, max_length=180)
    content = models.TextField(blank=True)
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            i = 2
            while BlogPost.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{i}"
                i += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "slug": self.slug,
            "content": self.content,
            "published": self.published,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
