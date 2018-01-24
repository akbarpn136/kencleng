from django.db import IntegrityError
from django.db.models import Sum
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView
from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from . import models
from . import serializers


# Create your views here.
class Index(TemplateView):
    def get(self, request, *args, **kwargs):
        return HttpResponse('Empty Page')


class Register(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        # Creating new User
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')

        try:
            user = User.objects.create_user(username, email, password)
            user.first_name = first_name
            user.last_name = last_name
            user.save()

            # Generate token for user
            token = Token.objects.create(user=user)

            return Response({
                'detail': 'User has been created.',
                'token': token.key
            })

        except IntegrityError:
            return Response({
                'detail': 'Your username is not excepted'
            }, status=status.HTTP_406_NOT_ACCEPTABLE)


class ChangePassword(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = get_object_or_404(User, username=request.user)
        user.set_password(request.POST.get('new_password'))
        user.save()

        return Response({'detail': 'Password has been saved.'})


class ChangeName(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, *args, **kwargs):
        user = get_object_or_404(User, username=request.user)
        user.first_name = request.POST.get('first_name')
        user.last_name = request.POST.get('last_name')
        user.save()

        return Response({'detail': 'Name has been saved.'})


class Transaksi(generics.ListCreateAPIView):
    queryset = models.Transaksi.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.TransaksiSerializer

    def get_queryset(self):
        return models.Transaksi.objects.filter(pemilik=self.request.user)

    def perform_create(self, serializer):
        serializer.save(pemilik=self.request.user)


class TransaksiSum(generics.ListAPIView):
    queryset = models.Transaksi.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.TransaksiSerializer

    def get_queryset(self):
        return models.Transaksi.objects.filter(pemilik=self.request.user)

    def get(self, request, *args, **kwargs):
        saldo = self.get_queryset().aggregate(Sum('jumlah'))
        return Response({'detail': saldo})


class TransaksiModifikasi(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Transaksi.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.TransaksiSerializer

    def get_queryset(self):
        return models.Transaksi.objects.filter(pemilik=self.request.user)

    def get_object(self):
        return get_object_or_404(models.Transaksi, pk=self.kwargs['transaksi_id'])
