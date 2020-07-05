from django.http import HttpResponse
from django.shortcuts import render

from .models import Treasure


def index(request):
    treasures = Treasure.objects.all()
    return render(request, 'index.html', {'treasures': treasures})


def detail(request, treasure_id):
    treasure = Treasure.objects.get(id=treasure_id)
    return render(request, 'detail.html', {'treasure': treasure})


def like(request):
    # Get the treasure_id from the request
    treasure_id = request.POST.get('treasure_id', None)
    # Initialize a local likes variable, set to 0
    likes = 0
    # Check to see if the treasure_id was actually received
    if treasure_id:
        # Look up the treasure that corresponds to that id
        treasure = Treasure.objects.get(id=int(treasure_id))
        if treasure is not None:
            # Look up the number of likes and increment the local likes var
            likes = treasure.likes + 1
            # Update the treasures number of likes
            treasure.likes = likes
            # Save into the database.
            treasure.save()
    # Return the updated likes value as an AJAX response
    return HttpResponse(likes)
