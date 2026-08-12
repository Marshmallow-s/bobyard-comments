import json
from pathlib import Path
from django.core.management.base import BaseCommand
from comments_api.models import Comment

class Command(BaseCommand):
    help = "Load comments.json into the database, preserving original timestamps."
    
    def add_arguments(self, parser):
        parser.add_argument(
            "--flush",
            action="store_true",
            help="Delete all existing comments before seeding.",
        )

    def handle(self, *args, **options):
        if options["flush"]:
            Comment.objects.all().delete()

        json_path = Path("comments.json")
        with open(json_path) as f:
            data = json.load(f)

        for item in data["comments"]:
            Comment.objects.create(
                parent=item["parent"],
                author=item["author"],
                text=item["text"],
                date=item["date"],
                likes=item["likes"],
                image=item["image"],
            )

        self.stdout.write(self.style.SUCCESS(f"Seeded {Comment.objects.count()} comments"))

