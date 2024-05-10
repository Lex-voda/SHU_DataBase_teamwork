import jwt
from datetime import datetime, timedelta
from functools import wraps
from flask import jsonify, request


class AuthManager:
    def __init__(self, secret_key):
        self.secret_key = secret_key
        #在构造函数中，定义了一个属性 ROLE_PERMISSIONS，用于存储不同角色的权限
        self.ROLE_PERMISSIONS = ["A", "T", "S"]

    #接受用户名和角色（默认为 "2"，即学生）作为参数，并返回生成的 JWT
    def generate_token(self, uno, status="2"):
        #计算 JWT 的过期时间，设置为当前时间加上一小时
        expiration_date = datetime.now() + timedelta(hours=1)
        #expiration_date = "1:00"
        #print(expiration_date)
        #生成 JWT，包含了用户名、角色和过期时间等信息，并使用密钥进行签名
        token = jwt.encode(
            {"Uno": uno, "Status": status, "Time": expiration_date},
            self.secret_key,
            algorithm="HS256",
        )
        return token

    # 解码函数
    def token_required(self, permission):
        def decorator(func):
            @wraps(func)
            def decorated(*args, **kwargs):
                token = request.headers.get("Authorization")
                if not token:
                    print("No authorization!")
                    return (
                        jsonify({"flag": "failed", "message": "Token is missing!"}),
                        401,
                    )
                try:
                    data = jwt.decode(token, self.secret_key, algorithms=["HS256"])
                    current_user = data["Uno"]
                    user_status = data["Status"]
                    if permission != self.ROLE_PERMISSIONS[int(user_status)]:
                        return (
                            jsonify(
                                {"flag": "failed", "message": "Permission denied!"}
                            ),
                            403,
                        )
                except:
                    return (
                        jsonify({"flag": "failed", "message": "Token is invalid!"}),
                        401,
                    )
                return func(current_user=current_user, *args, **kwargs)

            return decorated

        return decorator
