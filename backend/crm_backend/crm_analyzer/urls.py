from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('kpi/objectifs', views.GetObjectif.as_view()),
    path('kpi/objectifs/<int:id_objectif>', views.UpdateObjectif.as_view()),

]