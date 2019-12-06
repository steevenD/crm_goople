from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('kpi/stats', views.GetStats.as_view()),
    path('kpi/goal/<int:id_goal>', views.UpdateGoal.as_view()),
    path('kpi/goals', views.GetGoals.as_view()),

]