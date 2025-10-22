from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('add_expense/', views.add_expense, name='add_expense'),
    path('manage_expense/<int:user_id>/', views.manage_expense, name='manage_expense'),
    path('update_expense/<int:expense_id>/', views.update_expense, name='update_expense'),
]