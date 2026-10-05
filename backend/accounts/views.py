from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def register_user(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if User.objects.filter(username=username).exists():
            return JsonResponse({
                "success": False,
                "message": "Username already exists"
            })

        if User.objects.filter(email=email).exists():
            return JsonResponse({
                "success": False,
                "message": "Email already exists"
            })

        User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        return JsonResponse({
            "success": True,
            "message": "Registration Successful"
        })

    return JsonResponse({
        "success": False,
        "message": "Invalid Request"
    })


@csrf_exempt
def login_user(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")

        user = authenticate(
            username=username,
            password=password
        )

        if user is not None:
            login(request, user)

            return JsonResponse({
                "success": True,
                "username": user.username
            })

        return JsonResponse({
            "success": False,
            "message": "Invalid Username or Password"
        })

    return JsonResponse({
        "success": False
    })


@csrf_exempt
def logout_user(request):
    logout(request)

    return JsonResponse({
        "success": True,
        "message": "Logged Out Successfully"
    })


def current_user(request):
    if request.user.is_authenticated:
        return JsonResponse({
            "loggedIn": True,
            "username": request.user.username
        })

    return JsonResponse({
        "loggedIn": False
    })