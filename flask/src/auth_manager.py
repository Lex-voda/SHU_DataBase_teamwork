import jwt
from datetime import datetime, timedelta
from functools import wraps
from flask import jsonify, request


class AuthManager:
    def __init__(self, secret_key):
        self.secret_key = secret_key
        self.ROLE_PERMISSIONS = ["admin", "teacher", "student"]

    def generate_token(self, username, role="2"):
        expiration_date = datetime.utcnow() + timedelta(hours=1)
        token = jwt.encode(
            {"username": username, "role": role, "exp": expiration_date},
            self.secret_key,
            algorithm="HS256",
        )
        return token

    def token_required(self, permission):
        def decorator(func):
            @wraps(func)
            def decorated(*args, **kwargs):
                token = request.headers.get("Authorization")
                if not token:
                    print("No authorization!")
                    return (
                        jsonify({"status": "failed", "message": "Token is missing!"}),
                        401,
                    )
                try:
                    data = jwt.decode(token, self.secret_key, algorithms=["HS256"])
                    current_user = data["username"]
                    user_role = data["role"]
                    if permission != self.ROLE_PERMISSIONS[int(user_role)]:
                        return (
                            jsonify(
                                {"status": "failed", "message": "Permission denied!"}
                            ),
                            403,
                        )
                except:
                    return (
                        jsonify({"status": "failed", "message": "Token is invalid!"}),
                        401,
                    )
                return func(current_user=current_user, *args, **kwargs)

            return decorated

        return decorator
