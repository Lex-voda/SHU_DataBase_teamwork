from flask import jsonify
import psycopg2


class UserManager:
    def __init__(self, db_manager, auth_manager):
        self.db_manager = db_manager
        self.auth_manager = auth_manager

    # def verify_credentials(self, cursor, username, password):
    #     """验证用户凭据并返回用户类型"""
    #     query = "SELECT mm, qx FROM P WHERE xh = %s"
    #     cursor.execute(query, (username,))
    #     result = cursor.fetchone()
    #     if result and result[0].strip() == password:
    #         return result[1]  # 返回用户类型
    #     return None

    # def get_user_info(self, cursor, user_type, username):
    #     """根据用户类型获取用户信息"""
    #     user_type = user_type.strip()
    #     if user_type == "0":
    #         return self.__get_admin_info(cursor, username, user_type)

    #     elif user_type == "1":
    #         return self.__get_teacher_info(cursor, username, user_type)

    #     elif user_type == "2":
    #         return self.__get_student_info(cursor, username, user_type)

    #     return {}

    # def __get_student_info(self, cursor, username, user_type):
    #     """获取学生信息"""
    #     student_query = "SELECT S.xh, S.xm, I.xymc, S.zdnj, S.xb FROM S, I WHERE S.xh = %s AND S.xyh = I.xyh"
    #     cursor.execute(student_query, (username,))
    #     user_info = cursor.fetchone()
    #     return {
    #         "status": "success",
    #         "user_info": {
    #             "username": user_info[0],
    #             "name": user_info[1],
    #             "school": user_info[2],
    #             "level": user_info[3],
    #             "gender": user_info[4],
    #             "role": user_type,
    #         },
    #     }

    # def __get_teacher_info(self, cursor, username, user_type):
    #     """获取教师信息"""
    #     teacher_query = "SELECT T.jsgh, T.jsxm, T.jszc, T.xb, I.xymc FROM T, I WHERE jsgh = %s AND T.xyh = I.xyh"
    #     cursor.execute(teacher_query, (username,))
    #     user_info = cursor.fetchone()
    #     return {
    #         "status": "success",
    #         "user_info": {
    #             "username": user_info[0],
    #             "name": user_info[1],
    #             "school": user_info[4],
    #             "level": user_info[2],
    #             "gender": user_info[3],
    #             "role": user_type,
    #         },
    #     }

    # def __get_admin_info(self, cursor, username, user_type):
    #     """获取管理员信息（如果需要）"""
    #     # 如果管理员有特定信息需要返回，可以在这里添加查询逻辑
    #     # 目前只返回用户类型
    #     return {
    #         "status": "success",
    #         "user_info": {
    #             "username": username,
    #             "name": "admin",
    #             "school": "",
    #             "level": "",
    #             "gender": "",
    #             "role": user_type,
    #         },
    #     }

    def verify_credentials(self, cursor, username, password):
        """验证用户凭据并返回用户类型"""
        # 查询管理员表
        query_admin = """SELECT "Ano" FROM "Admin" WHERE "Ano" = %s AND "Akey" = %s"""
        cursor.execute(query_admin, (username, password))
        if cursor.rowcount > 0:
            return "A"

        # 查询教师表
        query_teacher = """SELECT "Tno" FROM "Teacher" WHERE "Tno" = %s AND "Tkey" = %s"""
        cursor.execute(query_teacher, (username, password))
        if cursor.rowcount > 0:
            return "T"

        # 查询学生表
        query_student = """SELECT "Sno" FROM "Student" WHERE "Sno" = %s AND "Skey" = %s"""
        cursor.execute(query_student, (username, password))
        if cursor.rowcount > 0:
            return "S"

        return None

    def get_user_info(self, cursor, user_type, username):
        """根据用户类型获取用户信息"""
        user_type = user_type.strip()
        if user_type == "A":
            return self.__get_admin_info(cursor, username)

        elif user_type == "T":
            return self.__get_teacher_info(cursor, username)

        elif user_type == "S":
            return self.__get_student_info(cursor, username)

        return {}

    def __get_admin_info(self, cursor, username):
        """获取管理员信息"""
        query = """SELECT "Ano", "Akey" FROM "Admin" WHERE "Ano" = %s"""
        cursor.execute(query, (username,))
        row = cursor.fetchone()
        if row:
            return {
                "Uno": row[0],
                "Key": row[1],
                "status": "A",
                "flag": "True"
            }
        return {}

    def __get_teacher_info(self, cursor, username):
        """获取教师信息"""
        query = """SELECT "Tno", "Tkey" FROM "Teacher" WHERE "Tno" = %s"""
        cursor.execute(query, (username,))
        row = cursor.fetchone()
        if row:
            return {
                "Uno": row[0],
                "Key": row[1],
                "status": "T",
                "flag": "True"
            }
        return {}


    def __get_student_info(self, cursor, username):
        """获取学生信息"""
        query = """SELECT "Sno", "Skey" FROM "Student" WHERE "Sno" = %s"""
        cursor.execute(query, (username,))
        row = cursor.fetchone()
        if row:
            return {
                "Uno": row[0],
                "Key": row[1],
                "status": "S",
                "flag": "True"
            }
        return {}
    
    # 学生方法

    ## 学生选课
    # def enroll_student_course(self, cursor, xh, kch, jsh):
    #     try:
    #         insert_query = """
    #             INSERT INTO E (xh, kch, jsh)
    #             VALUES (%(xh)s, %(kch)s, %(jsh)s);
    #         """
    #         parameters = {
    #             "xh": xh,
    #             "kch": kch,
    #             "jsh": jsh,
    #         }
    #         cursor.execute(insert_query, parameters)
    #         return jsonify({"status": "success"})
    #     except psycopg2.errors.UniqueViolation:
    #         return jsonify({"status": "failed", "message": "UniqueViolation"})

    ## 学生退课
    # def drop_student_course(self, cursor, xh, kch, jsh):
    #     try:
    #         delete_query = """
    #             DELETE FROM E
    #             WHERE xh = %(xh)s AND kch = %(kch)s AND jsh = %(jsh)s;
    #         """
    #         parameters = {
    #             "xh": xh,
    #             "kch": kch,
    #             "jsh": jsh,
    #         }
    #         cursor.execute(delete_query, parameters)
    #         if cursor.rowcount == 0:
    #             raise Exception("No matching record found for deletion")
    #         return jsonify({"status": "success"})
    #     except Exception as e:
    #         return jsonify({"status": "failed", "message": str(e)})
        
        
    # 学分完成情况
    def student_scredit_complete_situation(self, cursor, sno):
        query = """
            SELECT
                "Scredit"."Cno",
                "Course"."Cname",
                "Course"."Credit"
            FROM
                "Scredit"
            JOIN
                "Course" ON "Course"."Cno" = "Scredit"."Cno"
            WHERE
                "Scredit"."Sno" = %(sno)s
        """
        parameters = {'sno': sno}
        cursor.execute(query, parameters)
        rows = cursor.fetchall()
        
        enrolled_courses = [
            {
                "Cno": row[0],
                "Cname": row[1],
                "Credit": row[2],
            }
            for row in rows
        ]

        return enrolled_courses
    
        # return jsonify(
        #     {
        #         "course_info": enrolled_courses,
        #     }
        # )
        
        # if rows:
        #     return {
        #         "Cno": rows[0],
        #         "Cname": rows[1],
        #         "Credit": rows[3],
        #     }
        # return {}    

    # ## 获取学生选取课程
    # def get_student_enrolled_courses(self, cursor, xh):
    #     query = """
    #         SELECT
    #             E.kch,
    #             C.kcm,
    #             T.jsxm,
    #             O.sksj,
    #             C.xf,
    #             O.jsh,
    #             C.zdrs
    #         FROM
    #             E
    #         JOIN
    #             C ON E.kch = C.kch
    #         JOIN
    #             O ON E.kch = O.kch
    #         JOIN
    #             T ON O.jsgh = T.jsgh
    #         WHERE
    #             E.xh = %(xh)s;
    #     """
    #     parameters = {"xh": xh}
    #     cursor.execute(query, parameters)
    #     rows = cursor.fetchall()

    #     enrolled_courses = [
    #         {
    #             "kch": row[0],
    #             "kcm": row[1],
    #             "jsxm": row[2],
    #             "sksj": row[3],
    #             "xf": row[4],
    #             "jsh": row[5],
    #             "zdrs": row[6],
    #         }
    #         for row in rows
    #     ]

    #     return jsonify(
    #         {
    #             "status": "success",
    #             "total_count": len(enrolled_courses),
    #             "course_info": enrolled_courses,
    #         }
    #     )

    # # 课程信息查询
    # def get_partial_open_course(
    #     self,
    #     cursor,
    #     start_position,
    #     length=20,
    #     kch="",
    #     kcm="",
    #     xf="",
    #     jsh="",
    #     jsxm="",
    #     sksj="",
    # ):
    #     # 构建 SQL 查询总数的语句
    #     count_query = """
    #         SELECT
    #             COUNT(*)
    #         FROM
    #             O
    #         JOIN
    #             C ON O.kch = C.kch
    #         JOIN
    #             T ON O.jsgh = T.jsgh
    #     """

    #     # 添加约束条件
    #     where_conditions = []
    #     parameters = {}

    #     if kch != "":
    #         where_conditions.append("O.kch = %(kch)s")
    #         parameters["kch"] = kch
    #     if kcm != "":
    #         where_conditions.append("C.kcm = %(kcm)s")
    #         parameters["kcm"] = kcm
    #     if xf != "":
    #         where_conditions.append("C.xf = %(xf)s")
    #         parameters["xf"] = xf
    #     if jsh != "":
    #         where_conditions.append("O.jsh = %(jsh)s")
    #         parameters["jsh"] = jsh
    #     if jsxm != "":
    #         where_conditions.append("T.jsxm = %(jsxm)s")
    #         parameters["jsxm"] = jsxm
    #     if sksj != "":
    #         where_conditions.append("O.sksj = %(sksj)s")
    #         parameters["sksj"] = sksj

    #     if where_conditions:
    #         count_query += " WHERE " + " AND ".join(where_conditions)

    #     # 执行总数查询
    #     cursor.execute(count_query, parameters)
    #     total_count = cursor.fetchone()[0]

    #     # 构建 SQL 查询分页的语句
    #     schedule_query = """
    #         SELECT
    #             O.kch,
    #             C.kcm,
    #             O.jsh,
    #             T.jsxm,
    #             O.sksj,
    #             C.xf,
    #             C.zdrs
    #         FROM
    #             O
    #         JOIN
    #             C ON O.kch = C.kch
    #         JOIN
    #             T ON O.jsgh = T.jsgh
    #     """
    #     if where_conditions:
    #         schedule_query += " WHERE " + " AND ".join(where_conditions)

    #     # 添加排序和分页
    #     schedule_query += f"""
    #         ORDER BY
    #             O.kch
    #         OFFSET
    #             %(start_position)s
    #         LIMIT
    #             %(length)s;
    #     """
    #     parameters["start_position"] = start_position
    #     parameters["length"] = length

    #     # 执行分页查询
    #     cursor.execute(schedule_query, parameters)
    #     rows = cursor.fetchall()
    #     partial_schedule = [
    #         {
    #             "kch": row[0],
    #             "kcm": row[1],
    #             "jsh": row[2],
    #             "jsxm": row[3],
    #             "sksj": row[4],
    #             "xf": row[5],
    #             "zdrs": row[6],
    #         }
    #         for row in rows
    #     ]
    #     print(
    #         {
    #             "total_count": total_count,
    #             "course_info": partial_schedule,
    #             "status": "success",
    #         }
    #     )
    #     # 将总数和分页结果一起返回
    #     return jsonify(
    #         {
    #             "total_count": total_count,
    #             "course_info": partial_schedule,
    #             "status": "success",
    #         }
    #     )
    
    
    
    
    
    # 课程信息查询
    def get_course(
        self,
        cursor,
        cno="",
        cname="",
        credit="",
        ctno="",
        tname="",
        crtime="",
    ):

        # 添加约束条件
        where_conditions = []
        parameters = {}

        if cno != "":
            where_conditions.append(""""Course"."Cno" = %(Cno_)s""")
            parameters["Cno_"] = cno
        if cname != "":
            where_conditions.append(""""Course"."Cname" = %(Cname_)s""")
            parameters["Cname_"] = cname
        if credit != "":
            where_conditions.append(""""Course"."Credit" = %(Credit_)s""")
            parameters["Credit_"] = credit
        if ctno != "":
            where_conditions.append(""""Course"."Ctno" = %(Ctno_)s""")
            parameters["Ctno_"] = ctno
        if tname != "":
            where_conditions.append(""""Teacher"."tname" = %(Tname_)s""")
            parameters["Tname_"] = tname
        if crtime != "":
            where_conditions.append(""""ClassRoom"."crtime" = %(CRtime_)s""")
            parameters["CRtime_"] = crtime

        
        # 构建 SQL 查询分页的语句
        schedule_query = """
            SELECT
                "Course"."Cno",
                "Course"."Cname",
                "Course"."Credit",
                "Course"."Ctno",
                "Teacher"."Tname",
                "ClassRoom"."CRtime"
            FROM
                "Course"
            JOIN
                "Teacher" ON "Teacher"."Tno" = "Course"."Tno"
            JOIN
                "ClassRoom" ON "ClassRoom"."Cno" = "Course"."Cno"
        """
        if where_conditions:
            schedule_query += " WHERE " + " AND ".join(where_conditions)

        # 执行分页查询
        cursor.execute(schedule_query, parameters)
        rows = cursor.fetchall()
        course_exist_ = [
            {
                "Cno": row[0],
                "Cname": row[1],
                "Credit": row[2],
                "Ctno": row[3],
                "Tname": row[4],
                "CRtime": row[5],
            }
            for row in rows
        ]
        # 将结果返回
        return course_exist_
    
    
    
    
    
    # 学生项目查询
    def get_project(self, cursor, sno):
        # 查询项目信息
        proj_query = """
            SELECT
                "Project"."Pno",
                "Project"."Pname",
                "Project"."Sno",
                "Student"."Sname",
                "Project"."Tno",
                "Teacher"."Tname"
            FROM
                "Project"
            JOIN
                "Student" ON "Student"."Sno" = "Project"."Sno"
            JOIN
                "Teacher" ON "Teacher"."Tno" = "Project"."Tno"
            WHERE
                "Project"."Sno" = %(sno)s
        """
        proj_parameters = {'sno': sno}
        cursor.execute(proj_query, proj_parameters)
        rows = cursor.fetchall()
        
        project_info = [
            {
                "Pno": row[0],
                "Pname": row[1],
                "Sno": row[2],
                "Sname": row[3],
                "Tno": row[4],
                "Tname": row[5],
                "ProjMen": []  # 用于存储组员信息
            }
            for row in rows
        ]

        # 查询每个项目的组员信息并添加到项目信息中
        for proj in project_info:
            pno = proj['Pno']
            proj_mem_query = """
                SELECT "ProjMen"."Sno", "Student"."Sname"
                FROM "ProjMen"
                JOIN "Student" ON "ProjMen"."Sno" = "Student"."Sno"
                WHERE "Pno" = %(pno)s
            """
            proj_mem_parameters = {'pno': pno}
            cursor.execute(proj_mem_query, proj_mem_parameters)
            mem_rows = cursor.fetchall()
            
            proj['ProjMen'] = [
                {"Sno": mem_row[0], "Sname": mem_row[1]}
                for mem_row in mem_rows
            ]

        return project_info
    
    
    
    
    
    # 学生项目创建
    def insert_project_into_database(
        self, 
        cursor, 
        pname="", 
        psno_leader="", 
        ptno="", 
        psno_members=""
        ):
        try:
            # 生成项目号 pno
            # 获取指导老师的学院号 Cono 
            # cursor.fetchone()[0]执行了数据库查询并提取了结果集中的第一行的第一个值。
            # 在这个上下文中，它是从数据库中获取了指导老师的学院号 Cono。 
            # fetchone() 方法用于检索结果集中的下一行，而 [0] 用于提取该行的第一个列的值。
            cursor.execute(
                """
                SELECT "Cono" FROM "Teacher" WHERE "Teacher"."Tno" = %(ptno)s
                """, 
                {"ptno": ptno}
            )
            cono = cursor.fetchone()[0]

            # 获取当前 Project 表中项目数量
            #在这句代码中，1:04 是一个字符串格式化的操作，它指定了输出的格式。具体来说，{project_count + 1:04} 的含义如下：
            #project_count + 1 是要格式化的值，表示当前项目数量加一。
            #:04 指定了输出的格式。04 表示输出的数字要占据至少四个位置，如果数字不够四位，则用零填充左侧以达到指定的宽度。
            #所以，这段代码的作用是将 project_count + 1 格式化为至少四位的字符串，不足四位的部分用零填充。
            cursor.execute(
                """
                    SELECT COUNT(*) FROM "Project"
                """
            )
            project_count = cursor.fetchone()[0]

            # 构建项目编号 pno
            pno = f"{cono}{psno_leader[6:]}{project_count + 1:04}"

            # 插入数据到 Project 表
            cursor.execute(
                """
                INSERT INTO "Project" ("Pno", "Pname", "Sno", "Tno")
                VALUES (%(pno)s, %(pname)s, %(psno_leader)s, %(ptno)s)
                """,
                {"pno": pno, "pname": pname, "psno_leader": psno_leader, "ptno": ptno},
            )

            # 插入数据到 ProjMen 表
            for psno_member in psno_members:
                cursor.execute(
                    """
                    INSERT INTO "ProjMen" ("Pno", "Sno")
                    VALUES (%(pno)s, %(psno_member)s)
                    """,
                    {"pno": pno, "psno_member": psno_member},
                )

            # 提交事务，事务用来确保一系列的数据库操作要么全部成功执行，要么全部回滚（撤销），以保持数据的一致性和完整性
            cursor.connection.commit()

            # 返回所需的信息
            return {
                "Info": {"Pname": pname, "PSno": psno_members},
                "PTno": ptno,
                "flag": "1"  # 表示操作成功
            }
        except Exception as e:
            # 如果出现异常，回滚事务
            cursor.connection.rollback()

            # 返回失败的信息
            return {
                "Info": {"Pname": pname, "PSno": psno_members},
                "PTno": ptno,
                "flag": "0",  # 表示操作失败
                "message": str(e)  # 返回异常信息
            }

        
    
    
    
    
    
    # 学生教室查询
    def get_classroom(
        self,
        cursor,
        crno="",
        crtime="",
        cno="",
        ctno="",
    ):

        # 添加约束条件
        where_conditions = []
        parameters = {}

        if crno != "":
            where_conditions.append(""""ClassRoom"."CRno" = %(CRno_)s""")
            parameters["CRno_"] = crno
        if crtime != "":
            where_conditions.append(""""ClassRoom"."CRtime" = %(CRtime_)s""")
            parameters["CRtime_"] = crtime
        if cno != "":
            where_conditions.append(""""ClassRoom"."Cno" = %(Cno_)s""")
            parameters["Cno_"] = cno
        if ctno != "":
            where_conditions.append(""""ClassRoom"."Ctno" = %(Ctno_)s""")
            parameters["Ctno_"] = ctno

        
        # 构建 SQL 查询分页的语句
        classroom_query = """
            SELECT
                "ClassRoom"."CRno",
                "ClassRoom"."CRtime",
                "ClassRoom"."Cno",
                "ClassRoom"."Ctno",
                "Teacher"."Tname",
                "Course"."Cname"
            FROM
                "ClassRoom"
            JOIN
                "Course" ON "Course"."Cno" = "ClassRoom"."Cno" AND "Course"."Ctno" = "ClassRoom"."Ctno"
            JOIN
                "Teacher" ON "Teacher"."Tno" = "Course"."Tno"
        """
        if where_conditions:
            classroom_query += " WHERE " + " AND ".join(where_conditions)

        cursor.execute(classroom_query, parameters)
        rows = cursor.fetchall()
        classroom_exist_ = [
            {
                "CRno": row[0],
                "CRtime": row[1],
                "Cno": row[2],
                "Ctno": row[3],
                "Tname": row[4],
                "Cname": row[5],
            }
            for row in rows
        ]
        # 将结果返回
        return classroom_exist_
        
        
        
        
    
    # 会议室查询    
    def get_meetingroom_situation(self, cursor, mrno):
        try:
            # 执行查询操作
            cursor.execute(
                """
                SELECT "MRno", "Sno" AS "Uno", "MRtime"
                FROM "MeetingRoomS"
                WHERE "MRno" = %(mrno)s
                UNION
                SELECT "MRno", "Tno" AS "Uno", "MRtime"
                FROM "MeetingRoomT"
                WHERE "MRno" = %(mrno)s
                UNION
                SELECT "MRno", "Ano" AS "Uno", "MRtime"
                FROM "MeetingRoomA"
                WHERE "MRno" = %(mrno)s
                ORDER BY "MRtime"
                """,
                {"mrno": mrno}
            )
            # 获取查询结果
            rows = cursor.fetchall()

            # 初始化一个字典用于合并相同的 MRno
            meetingroom_dict = {}
            for row in rows:
                mrno = row[0]
                uno = row[1]
                mrtime = row[2]
                if mrno not in meetingroom_dict:
                    meetingroom_dict[mrno] = {"Uno": [], "MRtime": []}
                meetingroom_dict[mrno]["Uno"].append(uno)
                meetingroom_dict[mrno]["MRtime"].append(mrtime)

            # 将字典转换为所需的列表格式
            meetingroom_situation = [
                {
                    "MRno": mrno,
                    "Uno": details["Uno"],
                    "MRtime": details["MRtime"]
                }
                for mrno, details in meetingroom_dict.items()
            ]

            # 返回查询结果
            return meetingroom_situation
        except Exception as e:
            # 如果出现异常，返回错误消息
            return {"message": str(e)}



    
    
    
    
   # 会议室预约
    def meetingroom_order(self, cursor, mrno="", mrtime="", uno=""):
        # 插入数据到学生表 MeetingRoomS
        try:
            cursor.execute(
                """
                INSERT INTO "MeetingRoomS" ("MRno", "Sno", "MRtime")
                VALUES (%(mrno)s, %(uno)s, %(mrtime)s)
                """,
                {"mrno": mrno, "uno": uno, "mrtime": mrtime},
            )
            # 提交事务
            cursor.connection.commit()

            # 返回成功信息
            return {
                "flag": "True"
            }
        except Exception as e:
            # 如果出现异常，回滚事务
            cursor.connection.rollback()
            # 返回错误信息
            return {
                "flag": "False",
                "message": str(e)  # 返回错误信息，便于调试
            }






    # 我的会议室查询
    def get_my_meetingroom_S(
        self,
        cursor,
        mrno = "",
        mrtime = "",
        sno = ""
    ):

        # 添加约束条件
        where_conditions = []
        parameters = {}

        if mrno != "":
            where_conditions.append(""""MeetingRoomS"."MRno" = %(MRno_)s""")
            parameters["MRno_"] = mrno
        if mrtime != "":
            where_conditions.append(""""MeetingRoomS"."MRtime" = %(MRtime_)s""")
            parameters["MRtime_"] = mrtime
        if sno != "":
            where_conditions.append(""""MeetingRoomS"."Sno" = %(Sno_)s""")
            parameters["Sno_"] = sno

        
        # 构建 SQL 查询分页的语句
        meeting_query = """
            SELECT
                "MeetingRoomS"."MRno",
                "MeetingRoomS"."Sno",
                "MeetingRoomS"."MRtime"
            FROM
                "MeetingRoomS"
        """
        if where_conditions:
            meeting_query += " WHERE " + " AND ".join(where_conditions)

        cursor.execute(meeting_query, parameters)
        rows = cursor.fetchall()
        my_meetingroom_query_ = [
            {
                "MRno": row[0],
                "Sno": row[1],
                "MRtime": row[2]
            }
            for row in rows
        ]
        # 将结果返回
        return my_meetingroom_query_
    
    
    
    
    
    def meetingroom_delete_S(self, cursor, mrno="", sno=""):
        # 检查参数是否都有值，如果不是则返回消息
        if not mrno or not sno:
            return {"MRno": mrno, "Sno": sno, "flag": "0", "message": "Both MRno and Sno must be provided for deletion."}

        # 构建 SQL 删除语句
        delete_query = """
            DELETE FROM "MeetingRoomS"
            WHERE "MRno" = %(MRno)s AND "Sno" = %(Sno)s
        """

        # 执行删除操作
        cursor.execute(delete_query, {"MRno": mrno, "Sno": sno})

        # 检查是否成功删除
        if cursor.rowcount > 0:
            # 提交事务
            cursor.connection.commit()
            return {"MRno": mrno, "Sno": sno, "flag": "1"}
        else:
            # 如果出现异常，回滚事务
            cursor.connection.rollback()
            return {"MRno": mrno, "Sno": sno, "flag": "0", "message": "Failed to delete records."}
        
        
        
        
        

    # 教师方法

    def get_teacher_enrolled_courses(self, cursor, jsgh):
        query = """
            SELECT
                C.kch,
                C.cname,
                O.sksj,
                E.xh AS student_id,
                S.xm AS student_name,
                C.xf,
                C.zdrs
            FROM
                O
            JOIN
                C ON O.kch = C.kch
            LEFT JOIN
                E ON O.kch = E.kch
            LEFT JOIN
                S ON E.xh = S.xh
            WHERE
                O.jsgh = %(jsgh)s;
        """

        parameters = {"jsgh": jsgh}

        cursor.execute(query, parameters)
        rows = cursor.fetchall()

        teacher_schedule = {}
        for row in rows:
            kch, kcm, sksj, student_id, student_name, xf, zdrs = row
            if kch not in teacher_schedule:
                teacher_schedule[kch] = {
                    "kch": kch,
                    "kcm": kcm,
                    "sksj": sksj,
                    "xf": xf,
                    "zdrs": zdrs,
                    "student_info": [],
                }
            teacher_schedule[kch]["student_info"].append(
                {"xh": student_id, "xm": student_name}
            )

        return jsonify(
            {
                "status": "success",
                "total_courses": len(teacher_schedule),
                "course_info": list(teacher_schedule.values()),
            }
        )

    # 管理员方法

    def get_partial_course(
        self,
        cursor,
        start_position,
        length=20,
        kch="",
        kcm="",
        xf="",
    ):
        # 构建 SQL 查询总数的语句
        count_query = """
            SELECT
                COUNT(*)
            FROM
                C
            JOIN
                O ON C.kch = O.kch
            JOIN
                T ON O.jsgh = T.jsgh
        """

        # 添加约束条件
        where_conditions = []
        parameters = {}

        if kch != "":
            where_conditions.append("C.kch = %(kch)s")
            parameters["kch"] = kch
        if kcm != "":
            where_conditions.append("C.kcm = %(kcm)s")
            parameters["kcm"] = kcm
        if xf != "":
            where_conditions.append("C.xf = %(xf)s")
            parameters["xf"] = xf

        if where_conditions:
            count_query += " WHERE " + " AND ".join(where_conditions)

        # 执行总数查询
        cursor.execute(count_query, parameters)
        total_count = cursor.fetchone()[0]

        # 构建 SQL 查询分页的语句
        schedule_query = """
            SELECT
                C.kch,
                C.kcm,
                O.ctno,
                T.tname,
                O.sksj,
                C.xf,
                C.zdrs
            FROM
                C
            JOIN
                O ON C.kch = O.kch
            JOIN
                T ON O.jsgh = T.jsgh
        """
        if where_conditions:
            schedule_query += " WHERE " + " AND ".join(where_conditions)

        # 添加排序和分页
        schedule_query += f"""
            ORDER BY
                C.kch
            OFFSET
                %(start_position)s
            LIMIT
                %(length)s;
        """
        parameters["start_position"] = start_position
        parameters["length"] = length

        # 执行分页查询
        cursor.execute(schedule_query, parameters)
        rows = cursor.fetchall()
        partial_schedule = [
            {
                "kch": row[0],
                "kcm": row[1],
                "xf": row[5],
                "zdrs": row[6],
            }
            for row in rows
        ]

        # 将总数和分页结果一起返回
        result = {
            "total_count": total_count,
            "course_info": partial_schedule,
            "status": "success",
        }

        return result

    def enroll_teacher_course(self, cursor, jsgh, kch, sksj):
        try:
            # 判断同教师在相同sksj中是否已有课程
            check_course_query = "SELECT COUNT(*) FROM O WHERE jsgh = %s AND sksj = %s"
            cursor.execute(check_course_query, (jsgh, sksj))
            existing_courses_count = cursor.fetchone()[0]

            if existing_courses_count > 0:
                return {"status": "error", "message": "Course time conflict"}

            # 查询同课程号下所有开课的jsgh并保存入列表
            all_jsgh_query = "SELECT jsgh FROM O WHERE kch = %s"
            cursor.execute(all_jsgh_query, (kch,))
            all_jsgh_list = [row[0] for row in cursor.fetchall()]

            # 分配教师号，从最小值开始递增，直到找到第一个不冲突的教师号
            new_jsgh = 1001
            while new_jsgh in all_jsgh_list:
                new_jsgh += 1

            # 插入记录到表O
            insert_query = "INSERT INTO O (jsgh, kch, jsh, sksj) VALUES (%(jsgh)s, %{kch}s, %(jsh)s, %(sksj)s)"
            parameters = {
                "jsgh": jsgh,
                "kch": kch,
                "jsh": new_jsgh,
                "sksj": sksj,
            }
            cursor.execute(insert_query, parameters)

            return {"status": "success"}

        except psycopg2.errors.UniqueViolation:
            return jsonify({"status": "failed", "message": "UniqueViolation"})

    def drop_teacher_course(self, cursor, jsgh, kch, sksj):
        try:
            delete_query = """
                DELETE FROM O
                WHERE jsgh = %(jsgh)s AND kch = %(kch)s AND sksj = %(sksj)s;
            """
            parameters = {
                "jsgh": jsgh,
                "kch": kch,
                "sksj": sksj,
            }
            cursor.execute(delete_query, parameters)
            if cursor.rowcount == 0:
                raise Exception("No matching record found for deletion")
            return jsonify({"status": "success"})
        except Exception as e:
            return jsonify({"status": "failed", "message": str(e)})
