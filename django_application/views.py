from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from django_application.models import Article
from django_application.serializers import ArticleSerializer, ProfileArticleSerializer, DetailArticleSerializer
from django_application.utils import ArticleProfileLogic


class ArticleViewSet(ListModelMixin, GenericViewSet):
    """ Представление данных Articles """
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    """ Фильтрация, поиск и сортировка """
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filter_fields = ['owner']
    search_fields = ['title']
    ordering_fields = ['title', 'date_of_publication']
    """ Ограничение прав доступа и действий над объектами """
    permission_classes = [permissions.IsAuthenticated]


class ArticleDetailViewSet(RetrieveModelMixin, GenericViewSet):
    """ Представление данных Article """
    queryset = Article.objects.all()
    serializer_class = DetailArticleSerializer
    """ Ограничение прав доступа и действий над объектами """
    permission_classes = [permissions.IsAuthenticated]


class ArticleProfileViewSet(ArticleProfileLogic, ModelViewSet):
    """ Представления профильных статей: Статьи авторизованного пользователя, Добавление, удаление и изменение """
    queryset = Article.objects.all()
    serializer_class = ProfileArticleSerializer
    """ Фильтрация, поиск и сортировка """
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    ordering_fields = ['title', 'date_of_publication']
    """ Ограничение прав доступа и действий над объектами """
    permission_classes = [permissions.IsAuthenticated]
