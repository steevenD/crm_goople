from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('editor_crm/', views.CreateGetAllSale.as_view()),
    path('editor_crm/<int:pk>', views.UpdateGetDeleteSale.as_view())

]