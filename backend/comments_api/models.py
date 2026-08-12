from django.db import models
from django.utils import timezone

class Comment(models.Model):
    parent = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    text = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    likes = models.IntegerField(default=0)
    image = models.URLField(blank=True, default="")

    def __str__(self):
        return f"{self.author}: {self.text[:30]}"