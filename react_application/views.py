from django.shortcuts import render


def primary(request):
    """ Первоначальное представление """
    return render(request, 'react_application/index.html')
