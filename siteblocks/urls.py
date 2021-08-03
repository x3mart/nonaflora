from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import homepage_view


# router = DefaultRouter()
# router.register(r'showcases', ShowcaseViewSet, basename='showcase')

urlpatterns = [
    # path('infofororders/<pk>/', InfoForOrderView.as_view()),
    path('homepage/', homepage_view, name='homepage_view'),
]

# urlpatterns += router.urls