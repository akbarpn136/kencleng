from django.db import models


# Create your models here.
class Transaksi(models.Model):
    deskripsi = models.TextField()
    jumlah = models.DecimalField(max_digits=20, decimal_places=2)
    dibuat = models.DateField(auto_now_add=True)
    diubah = models.DateField(auto_now=True)
    pemilik = models.ForeignKey('auth.User', null=False, on_delete=models.CASCADE)

    class Meta:
        ordering = ('-pk',)
