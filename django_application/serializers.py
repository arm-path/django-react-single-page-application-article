from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from django_application.models import Article


class ArticleSerializer(ModelSerializer):
    """ Сериализация модели Article """

    owner = serializers.CharField(source='owner.username', read_only=True)

    class Meta:
        model = Article
        fields = ('pk', 'title', 'image', 'description', 'date_of_publication', 'owner')


class DetailArticleSerializer(ModelSerializer):
    """ Сериализация статьи """

    owner = serializers.CharField(source='owner.username', read_only=True)

    class Meta:
        model = Article
        fields = ('pk', 'title', 'image', 'description', 'content', 'date_of_publication', 'owner')


class ProfileArticleSerializer(ModelSerializer):
    """ Сериализация модели для статей пользователей """

    class Meta:
        model = Article
        fields = ('pk', 'title', 'image', 'description', 'content', 'date_of_publication')
