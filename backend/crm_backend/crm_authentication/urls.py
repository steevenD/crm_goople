from django.urls import path
from . import views
from rest_framework import authtoken
from rest_framework.authtoken import views as authviews

urlpatterns = [
    path('api-token-auth/', authviews.obtain_auth_token, name='api-token-auth'),
    path('register/', views.Register.as_view())
]