from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import parser_classes

# Create your views here.

class Register(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    @parser_classes((JSONParser,)) 
    def post(self, request, *args, **kwargs):
        
        #username = request.POST.get('username')
        username = request.data['username']
        password = request.data['password']
        email = request.data['email']

        # first_name = request.data['first_name']
        # last_name = request.data['last_name']

        user = User.objects.create_user(username, email, password)

        # user.first_name = None
        # user.last_name = None

        user.save()

        token = Token.objects.create(user=user)
        return Response({'detail': 'User is create ' + token.key})