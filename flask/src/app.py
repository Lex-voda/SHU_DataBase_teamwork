from flask import Flask, request, jsonify
from flask_cors import CORS
from config_manager import ConfigManager
from db_manager import DBManager
from auth_manager import AuthManager
from user_manager import UserManager

app = Flask(__name__)
cors = CORS(app, origins="*")

# 配置和数据库管理
config_manager = ConfigManager()
db_params = config_manager.get_db_params()
app.config["SECRET_KEY"] = config_manager.get_secret_key()

# 初始化管理器
db_manager = DBManager(db_params)
auth_manager = AuthManager(app.config["SECRET_KEY"])
user_manager = UserManager(db_manager, auth_manager)


# 登录路由
@app.route("/Login", methods=["POST"])
@db_manager.connect_db
def login(cursor):
    data = request.get_json()
    username = data["Uno"]
    password = data["Key"]
    print(data)
    if not username or not password:
        return (
            jsonify(
                {
                    "flag": "failed",
                    "message": "Missing username or password",
                }
            ),
            400,
        )

    try:
        # 获得改用户的身份
        user_type = user_manager.verify_credentials(cursor, username, password)
        print(user_type)
        # 判断是否存在该用户
        if user_type is not None:
            # 获取用户完整数据
            user_info = user_manager.get_user_info(cursor, user_type, username)
            # print(user_info)
            # print("Authorization = " + str(auth_manager.generate_token(username, user_info["status"])))
            # ans = {
            #     "Authorization": str(auth_manager.generate_token(
            #         username, user_info["status"]
            #     )),
            #     #user_info内容："Uno": row[0],"Key": row[1],"status": "A","flag": True
            #     **user_info,
            # }
            return jsonify(
                    {
                        # generate_token在生成Authorization
                        "Authorization": auth_manager.generate_token(
                            username, user_info["status"]
                        ),
                        **user_info,
                    }
                )
        else:
            return (
                jsonify(
                    {
                        "flag": "failed",
                        "message": "Invalid credentials",
                    }
                ),
                401,
            )

    except Exception as e:
        print("Exception occurred:", str(e))
        return (
            jsonify(
                {
                    "flag": "failed",
                    "message": str(e),
                }
            ),
            500,
        )

# # 学生选课路由
# @app.route(
#     "/Scredict_Inquire/",
#     methods=["GET"],
#     endpoint="/Scredict_Inquire/",
# )
# @auth_manager.token_required("S")
# @db_manager.connect_db
# def student_enroll(cursor, current_user):
#     # 获取前端发送的 JSON 表单
#     data = request.get_json()
#     print(data)
#     xh = current_user

#     # 判断是课程查询请求还是选课请求
#     if "action" not in data:
#         return jsonify(
#             {
#                 "status": "failed",
#                 "message": "Invalid request format",
#             }
#         )

#     action = data["action"]

#     if action == "get_schedule":
#         # 课程查询请求
#         partial_schedule = user_manager.get_partial_open_course(
#             cursor=cursor,
#             start_position=0,
#             length=40,
#             kch=data["course_info"]["kch"],
#             kcm=data["course_info"]["kcm"],
#             xf=data["course_info"]["xf"],
#             jsh=data["course_info"]["jsh"],
#             jsxm=data["course_info"]["jsxm"],
#             sksj=data["course_info"]["sksj"],
#         )
#         print(partial_schedule)
#         return partial_schedule

#     elif action == "enroll":
#         # 选课请求
#         response = user_manager.enroll_student_course(
#             cursor,
#             xh=xh,
#             kch=data["course_info"]["kch"],
#             jsh=data["course_info"]["jsh"],
#         )
#         return response

#     return jsonify(
#         {
#             "status": "failed",
#             "message": "Invalid action",
#         }
#     )


# # 学生退课路由
# @app.route(
#     "/student_drop/",
#     methods=["POST"],
#     endpoint="/student_drop/",
# )
# @auth_manager.token_required("student")
# @db_manager.connect_db
# def student_drop(cursor, current_user):
#     data = request.get_json()
#     xh = current_user  # 当前登录的学生学号

#     # 判断是课程查询请求还是选课请求
#     if "action" not in data:
#         return jsonify(
#             {
#                 "status": "failed",
#                 "message": "Invalid request format",
#             }
#         )

#     action = data["action"]

#     if action == "get_schedule":
#         # 课程查询请求
#         enrolled_courses = user_manager.get_student_enrolled_courses(
#             cursor=cursor, xh=xh
#         )
#         return enrolled_courses

#     elif action == "drop":
#         # 选课请求
#         response = user_manager.drop_course(
#             cursor=cursor,
#             xh=xh,
#             kch=data["course_info"]["kch"],
#             jsh=data["course_info"]["jsh"],
#         )
#         return response

#     return jsonify(
#         {
#             "status": "failed",
#             "message": "Invalid action",
#         }
#     )





# 学分完成情况查询路由
# 连接路由
@app.route(
    "/Scredit_Inquire",
    methods=["GET"],
    endpoint="/Scredit_Inquire",
)
@auth_manager.token_required("2")
# 连接数据库
@db_manager.connect_db
def student_scredit_complete(cursor, current_user):
    # 获取前端发送的 JSON 表单
    data = request.get_json()
    # print("qina data = ", data)
    # 暂时还没有做日志系统
    #authorization = request.headers.get("Authorization")
    sno = data["Sno"]
    # print("qian sno = ", sno)
    enrolled_courses = user_manager.student_scredit_complete_situation(cursor, sno)
    # print("qian enrolled_courses = ", enrolled_courses)
    data["Scredit"] = enrolled_courses
    return data




    
# 学生课程查询路由
@app.route(
    "/Course_Inquire",
    methods=["POST"],
    endpoint="/Course_Inquire",
)
@auth_manager.token_required("2")
@db_manager.connect_db
def course_exist_find(cursor, current_user):
    data = request.get_json()
    print("qian data = ", data)
    # 课程查询请求
    course_exist = user_manager.get_course(
        cursor=cursor,
        # start_position=0,
        # length=40,
        cno=data.get("Cno", ""),
        cname=data.get("Cname", ""),
        credit=data.get("Credit", ""),
        ctno=data.get("Ctno", ""),
        tname=data.get("Tname", ""),
        crtime=data.get("CRtime", ""),
    )
    print("qian course_exist_find = ", course_exist)
    # 返回已选课程信息的 JSON 响应
    data["Course"] = course_exist
    return data





# 学生项目查询路由
@app.route(
    "/Project_Inquire_S",
    methods=["GET"],
    endpoint="/Project_Inquire_S",
)
@auth_manager.token_required("2")
@db_manager.connect_db
def project_exist_find(cursor, current_user):
    data = request.get_json()
    # print("qian data = ", data)
    sno = data["Sno"]
    # 课程查询请求
    project_exist = user_manager.get_project(cursor, sno)
    # print("qian course_exist_find = ", course_exist)
    # 返回已选课程信息的 JSON 响应
    return jsonify(project_exist)





# 学生新建项目路由
@app.route(
    "/Project_Insert",
    methods=["POST"],
    endpoint="/Project_Insert",
)
@auth_manager.token_required("2")
@db_manager.connect_db
def project_insert(cursor, current_user):
    data = request.get_json()
    print("qian data = ", data)
    # 教室查询请求
    Project_insert_flag = user_manager.insert_project_into_database(
        cursor=cursor,
        # 提取项目名、组长学号、老师工号和组员学号列表
        pname = data["Info"]["Pname"],
        psno_leader = data["Info"]["PSno"][0],  # 第一个元素为组长学号
        ptno = data["PTno"],
        psno_members = data["Info"]["PSno"][1:],  # 剩余元素为组员学号列表
    )["flag"]
    # print("qian course_exist_find = ", course_exist)
    # 返回已选课程信息的 JSON 响应
    data["flag"]=Project_insert_flag
    return data





# 学生教室使用查询路由
@app.route(
    "/ClassRoom_Inquire",
    methods=["POST"],
    endpoint="/ClassRoom_Inquire",
)
@auth_manager.token_required("2")
@db_manager.connect_db
def classroom_exist_find(cursor, current_user):
    data = request.get_json()
    print("qian data = ", data)
    keywords = data["Keywords"]
    # 教室查询请求
    classroom_exist = user_manager.get_classroom(
        cursor=cursor,
        # start_position=0,
        # length=40,
        crno=keywords.get("CRno", ""),
        crtime=keywords.get("CRtime", ""),
        cno=keywords.get("Cno", ""),
        ctno=keywords.get("Ctno", "")
    )
    # print("qian course_exist_find = ", course_exist)
    # 返回已选课程信息的 JSON 响应
    data["ClassRoom"] = classroom_exist
    return data


# 会议室查询路由
@app.route(
    "/MeetingRoom_Inquire",
    methods=["POST"],
    endpoint="/MeetingRoom_Inquire",
)
@db_manager.connect_db
def meetingroom_inquire_rute(cursor):
    data = request.get_json()
    print("qian data = ", data)
    # 教室查询请求
    meetingroom_situation = user_manager.get_meetingroom_situation(
        cursor=cursor,
        mrno=data.get("MRno", "")
    )
    # print("qian course_exist_find = ", course_exist)
    # 返回已选课程信息的 JSON 响应
    data["MeetingRoom"] = meetingroom_situation
    return data
    
    
    
    
    
# 会议室预约路由(自动根据输入的uno判断身份)
@app.route(
    "/MeetingRoomS_Inser_S/",
    methods=["POST"],
    endpoint="/MeetingRoomS_Inser_S/",
)
@db_manager.connect_db
def meetingroom_inquire_rute(cursor):
    data = request.get_json()
    print("qian data = ", data)
    # 教室查询请求
    meetingroom_order_result = user_manager.meetingroom_order(
        cursor=cursor,
        mrno= data["Info"]["MRno"],
        mrtime = data["Info"]["MRtime"],
        uno = data["Info"]["Uno"] 
    )
    # print("qian course_exist_find = ", course_exist)
    # 返回已选课程信息的 JSON 响应
    return jsonify(meetingroom_order_result)





# 学生查询我的会议室预约路由（标签为Sno，文档中是Uno）
@app.route(
    "/My_MeetingRoom_Inquire/",
    methods=["POST"],
    endpoint="/My_MeetingRoom_Inquire/",
)
@db_manager.connect_db
def my_meetingroom_inquire_S_rute(cursor):
    data = request.get_json()
    print("qian data = ", data)
    # 教室查询请求
    meetingroom_order_result = user_manager.get_my_meetingroom_S(
        cursor=cursor,
        mrno=data.get("MRno", ""),
        mrtime=data.get("MRtime", ""),
        sno=data.get("Sno", "")
    )
    # print("qian course_exist_find = ", course_exist)
    # 返回已选课程信息的 JSON 响应
    return jsonify(meetingroom_order_result)





# 学生会议室取消预约路由
@app.route(
    "/My_MeetingRoom_Delete_S/",
    methods=["POST"],
    endpoint="/My_MeetingRoom_Delete_S/",
)
@db_manager.connect_db
def meetingroom_delete_rute(cursor):
    data = request.get_json()
    print("qian data = ", data)
    # 教室查询请求
    meetingroom_order_result = user_manager.meetingroom_delete_S(
        cursor=cursor,
        mrno= data.get("MRno", ""),
        sno= data.get("Sno", "")
    )
    # print("qian course_exist_find = ", course_exist)
    # 返回已选课程信息的 JSON 响应
    return jsonify(meetingroom_order_result)





# # 学生查课路由
# @app.route(
#     "/get_student_schedule/",
#     methods=["GET", "POST"],
#     endpoint="/get_student_schedule/",
# )
# @auth_manager.token_required("student")
# @db_manager.connect_db
# def get_student_schedule(cursor, current_user):
#     data = request.get_json()
#     xh = current_user
#     if "action" not in data:
#         return jsonify(
#             {
#                 "status": "failed",
#                 "message": "Invalid request format",
#             }
#         )

#     action = data["action"]

#     if action == "get_schedule":
#         # 调用已有的函数获取已选课程信息
#         enrolled_courses = user_manager.get_student_enrolled_courses(cursor, xh)
#         # 返回已选课程信息的 JSON 响应
#         return enrolled_courses
#     return jsonify(
#         {
#             "status": "failed",
#             "message": "Invalid action",
#         }
#     )

# # 学生创建项目路由
# @app.route(
#     "/Project_Insert/",
#     methods=["POST"],
#     endpoint="/Project_Insert/",
# )
# @auth_manager.token_required("S")
# @db_manager.connect_db
# def student_enroll(cursor, current_user):
#     # 获取前端发送的 JSON 表单
#     data = request.get_json()
#     print(data)
#     xh = current_user

#     # 判断是课程查询请求还是选课请求
#     if "action" not in data:
#         return jsonify(
#             {
#                 "status": "failed",
#                 "message": "Invalid request format",
#             }
#         )

#     action = data["action"]

#     if action == "get_schedule":
#         # 课程查询请求
#         partial_schedule = user_manager.get_partial_open_course(
#             cursor=cursor,
#             start_position=0,
#             length=40,
#             kch=data["course_info"]["kch"],
#             kcm=data["course_info"]["kcm"],
#             xf=data["course_info"]["xf"],
#             jsh=data["course_info"]["jsh"],
#             jsxm=data["course_info"]["jsxm"],
#             sksj=data["course_info"]["sksj"],
#         )
#         print(partial_schedule)
#         return partial_schedule

#     elif action == "enroll":
#         # 选课请求
#         response = user_manager.enroll_student_course(
#             cursor,
#             xh=xh,
#             kch=data["course_info"]["kch"],
#             jsh=data["course_info"]["jsh"],
#         )
#         return response

#     return jsonify(
#         {
#             "status": "failed",
#             "message": "Invalid action",
#         }
#     )







# 教师接口
# 教师查课路由
@app.route(
    "/get_teacher_schedule/",
    methods=["GET", "POST"],
    endpoint="/get_teacher_schedule/",
)
@auth_manager.token_required("teacher")
@db_manager.connect_db
def get_teacher_schedule(cursor, current_user):
    data = request.get_json()
    jsgh = current_user
    if "action" not in data:
        return jsonify(
            {
                "status": "failed",
                "message": "Invalid request format",
            }
        )

    action = data["action"]

    if action == "get_schedule":
        enrolled_courses = user_manager.get_teacher_enrolled_courses(cursor, jsgh)
        return enrolled_courses
    return jsonify(
        {
            "status": "failed",
            "message": "Invalid action",
        }
    )


# 管理员用户接口
@app.route(
    "/manage_course_enroll/",
    methods=["GET", "POST"],
    endpoint="/manage_course_enroll/",
)
@auth_manager.token_required("admin")
@db_manager.connect_db
def manage_course_enroll(cursor, current_user):
    # 获取前端发送的 JSON 表单
    data = request.get_json()

    # 判断是课程查询请求还是选课请求
    if "action" not in data:
        return jsonify(
            {
                "status": "failed",
                "message": "Invalid request format",
            }
        )

    action = data["action"]

    if action == "get_schedule":
        # 课程查询请求
        partial_schedule = user_manager.get_partial_course(
            cursor=cursor,
            start_position=0,
            length=40,
            kch=data["course_info"]["kch"],
            kcm=data["course_info"]["kcm"],
            xf=data["course_info"]["xf"],
        )
        return partial_schedule
    elif action == "enroll":
        # 选课请求
        response = user_manager.enroll_teacher_course(
            cursor,
            jsgh=data["user_info"]["id"],
            kch=data["course_info"]["kch"],
            sksj=data["course_info"]["sksj"],
        )
        return response

    return jsonify(
        {
            "status": "failed",
            "message": "Invalid action",
        }
    )


@app.route(
    "/manage_course_drop/",
    methods=["GET", "POST"],
    endpoint="/manage_course_drop/",
)
@auth_manager.token_required("admin")
@db_manager.connect_db
def manage_course_drop(cursor, current_user):
    data = request.get_json()

    # 判断是课程查询请求还是选课请求
    if "action" not in data:
        return jsonify(
            {
                "status": "failed",
                "message": "Invalid request format",
            }
        )

    action = data["action"]

    if action == "get_schedule":
        # 课程查询请求
        enrolled_courses = user_manager.get_teacher_enrolled_courses(
            cursor=cursor,
            jsgh=data["user_info"]["id"],
        )
        return enrolled_courses

    elif action == "drop":
        # 选课请求
        response = user_manager.drop_teacher_course(
            cursor=cursor,
            jsgh=data["user_info"]["id"],
            kch=data["course_info"]["kch"],
            sksj=data["course_info"]["sksj"],
        )
        return response

    return jsonify(
        {
            "status": "failed",
            "message": "Invalid action",
        }
    )


@app.route(
    "/manage_student_course_enroll/",
    methods=["GET", "POST"],
    endpoint="/manage_student_course_enroll/",
)
@auth_manager.token_required("admin")
@db_manager.connect_db
def manage_student_course_enroll(cursor, current_user):
    # 获取前端发送的 JSON 表单
    data = request.get_json()

    # 判断是课程查询请求还是选课请求
    if "action" not in data:
        return jsonify({"status": "failed", "message": "Invalid request format"})

    action = data["action"]

    if action == "get_schedule":
        # 课程查询请求
        partial_schedule = user_manager.get_partial_course(
            cursor=cursor,
            start_position=0,
            length=40,
            kch=data["course_info"]["kch"],
            kcm=data["course_info"]["kcm"],
            xf=data["course_info"]["xf"],
            jsh=data["course_info"]["jsh"],
            jsxm=data["course_info"]["jsxm"],
            sksj=data["course_info"]["sksj"],
        )
        print(partial_schedule)
        return partial_schedule

    elif action == "enroll":
        # 选课请求
        response = user_manager.enroll_student(
            cursor,
            xh=data["user_info"]["id"],
            kch=data["course_info"]["kch"],
            jsh=data["course_info"]["jsh"],
        )
        return response

    return jsonify({"status": "failed", "message": "Invalid action"})


@app.route(
    "/manage_student_course_drop/",
    methods=["GET", "POST"],
    endpoint="/manage_student_course_drop/",
)
@auth_manager.token_required("admin")
@db_manager.connect_db
def manage_student_course_drop(cursor, current_user):
    data = request.get_json()

    # 判断是课程查询请求还是选课请求
    if "action" not in data:
        return jsonify(
            {
                "status": "failed",
                "message": "Invalid request format",
            }
        )

    action = data["action"]

    if action == "get_schedule":
        # 课程查询请求
        enrolled_courses = user_manager.get_teacher_s(
            cursor=cursor,
            xh=data["user_info"]["id"],
        )
        return enrolled_courses

    elif action == "drop":
        # 退课请求
        response = user_manager.drop_student_course(
            cursor=cursor,
            jsgh=data["user_info"]["id"],
            kch=data["course_info"]["kch"],
            jsh=data["course_info"]["jsh"],
        )
        return response

    return jsonify(
        {
            "status": "failed",
            "message": "Invalid action",
        }
    )


if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=8000)
