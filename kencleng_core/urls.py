from django.conf.urls import url
from . import views
from rest_framework.authtoken import views as vw

urlpatterns = [
    url(r'^$', view=views.Index.as_view()),
    url(r'^register/$', view=views.Register.as_view()),
    url(r'^change_password/$', view=views.ChangePassword.as_view()),
    url(r'^change_name/$', view=views.ChangeName.as_view()),
    url(r'^login/$', view=vw.obtain_auth_token),
    url(r'^v1/transaksi/$', view=views.Transaksi.as_view()),
    url(r'^v1/transaksi/saldo/$', view=views.TransaksiSum.as_view()),
    url(r'^v1/transaksi/(?P<transaksi_id>\d+)/$', view=views.TransaksiModifikasi.as_view())
]
