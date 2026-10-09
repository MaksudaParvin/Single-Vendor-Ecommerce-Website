from rest_framework import filters, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from .permissions import IsAdminOrReadOnly


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]

    queryset = Product.objects.filter(
        status=Product.Status.ACTIVE
    ).select_related("category")

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = ["category", "category__slug"]
    search_fields = ["name", "description", "category__name"]
    ordering_fields = ["name", "price", "created_at"]
    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = Product.objects.select_related("category")

        if not self.request.user.is_staff:
            queryset = queryset.filter(status=Product.Status.ACTIVE)

        return queryset