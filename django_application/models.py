from django.contrib.auth.models import User
from django.db import models


class Article(models.Model):
    """ Модель статей """
    title = models.CharField('Название', max_length=69)
    image = models.ImageField('Изображение', upload_to='articles/%Y/%m', blank=True)
    description = models.TextField('Краткое содержание', max_length=255)
    content = models.TextField('Содержание', blank=True)
    date_of_publication = models.DateTimeField('Дата публикации', auto_now_add=True)
    owner = models.ForeignKey(User, verbose_name='Владелец', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Статья'
        verbose_name_plural = 'Статьии'
        ordering = ['date_of_publication', 'title']
