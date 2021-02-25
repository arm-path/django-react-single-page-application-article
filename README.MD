# Одностраничный тестовый проект Django с React.

### Функционал:

1. Регистрация и авторизация.
2. Авторизация по JWT. Библиотека Simple JWT через djoser.
3. Список всех статей, и статей созданных авторизованным пользователем.
4. Функции добавления, редактирования и удаления статей, библиотека axios c react.

### Особенности:

1. Работа Django backend с React frontend.
2. Весь функционал организован без изменения url адреса http://127.0.0.1:8000/, исключение форма регистрации.

### Начало работы:
1. Установить зависимости Django.
> pip install -r requirements.txt

2. Использование Postgres через docker-compose.yml в проекте Django.
>  docker-compose up \
>  docker-compose ps: Узнать `name container` Docker. \
>  docker exec -it `name container`  psql -U postgres -c "CREATE DATABASE `name_db`;" \
>  docker exec -it `name container` psql -U postgres -c "CREATE USER `name_user` WITH PASSWORD '`password`';" \
>  docker exec -it `name container` psql -U postgres -c "ALTER ROLE `name_user` SET client_encoding TO 'utf8';" \
>  docker exec -it `name container` psql -U postgres -c "ALTER ROLE `name_user` SET default_transaction_isolation TO '
  read committed';" \
>  docker exec -it `name container` psql -U postgres -c "ALTER ROLE `name_user` SET timezone TO 'UTC';" \
>  docker exec -it `name container` psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE `name_db` TO `name_user`;" \
- Изменить в django_applications/settings.py: DATABASES:  'NAME': `name_db`, 'USER': ` user_db`, '
  PASSWORD': `password_db`
>  ./manage.py makemigrations  - Создать миграции.\
>  ./manage.py migrate - Применить миграции.\
>  ./manage.py createsuperuser - Создать пользователя.

3. Запустить React.
> cd react_application \
> npm install - Установить зависимости React. \
> npm run dev - Запустить React.

4. Запустить Django.
> ./manage.py runserver

### Коментарии:
-Вход в систему: срок JWT token два дня, автоматическое обновление не стал делать...