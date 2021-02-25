"""django_conf URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from django_application.views import ArticleViewSet, ArticleProfileViewSet, ArticleDetailViewSet

router = SimpleRouter()
router.register('api/articles', ArticleViewSet),
router.register('api/article', ArticleDetailViewSet),
router.register('api/profile_article', ArticleProfileViewSet),


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.authtoken')),
    path('api/auth/', include('djoser.urls.jwt')),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('', include('react_application.urls')),
    path('registration/', include('react_application.urls'))
]

urlpatterns += router.urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# urlpatterns api/auth/:
# # # /users/
# # # /users/me/
# # # /users/confirm/
# # # /users/resend_activation/
# # # /users/set_password/
# # # /users/reset_password/
# # # /users/reset_password_confirm/
# # # /users/set_username/
# # # /users/reset_username/
# # # /users/reset_username_confirm/
# # # /token/login/ (Token Based Authentication)
# # # /token/logout/ (Token Based Authentication)
# # # /jwt/create/ (JSON Web Token Authentication)
# # # /jwt/refresh/ (JSON Web Token Authentication)
# # # /jwt/verify/ (JSON Web Token Authentication)
