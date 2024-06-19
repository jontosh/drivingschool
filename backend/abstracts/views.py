import importlib

from django.shortcuts import render,HttpResponse

def vie(requests):
    return render(requests,"Doccumentation.html")