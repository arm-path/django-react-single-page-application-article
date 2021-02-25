from django.urls import path

from .views import primary

urlpatterns = [
    path('', primary, name='primary')
]