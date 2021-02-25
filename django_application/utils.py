from django_application.models import Article


class ArticleProfileLogic:
    def get_queryset(self):
        """ Получение статей авторизованного пользователя """
        return Article.objects.filter(owner=self.user_by_token())

    def perform_create(self, serializer):
        """ Добавление дополнительных полей перед сохранением """
        serializer.save(owner=self.user_by_token())

    def user_by_token(self):
        """Получение пользователя по jwt token"""
        raw_token = self.request.authenticators[1].get_raw_token(
            self.request.authenticators[1].get_header(self.request))
        user = self.request.authenticators[1].get_user(self.request.authenticators[1].get_validated_token(raw_token))
        return user
