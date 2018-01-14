from rest_framework import serializers
from . import models


class TransaksiSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transaksi
        fields = '__all__'
        read_only_fields = ('dibuat', 'diubah', 'pemilik')
