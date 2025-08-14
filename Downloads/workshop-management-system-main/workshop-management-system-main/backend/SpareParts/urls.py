from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SparePartViewSet, SparePartsForm, AvailableSpareParts, IssueSparePartsView, IssueHistoryView

router = DefaultRouter()
router.register(r'spareparts', SparePartViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('form/', SparePartsForm.as_view(), name='form'),
    path('available-spareparts/', AvailableSpareParts.as_view(), name='available-spareparts'),
    path('issue-spareparts/', IssueSparePartsView.as_view(), name='issue-spareparts'),
    path('Spare-parts/history/', IssueHistoryView.as_view()),

]
