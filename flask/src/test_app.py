import unittest
from app import app

class TestApp(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True





    # # 修改后的测试用例示例
    # #连接测试
    # def test_login_missing_credentials(self):
    #     response = self.app.post('/Login/', json={"Uno": "20100001", "Key": "12345678"})
    #     data = response.get_json()
    #     print("try connect data = ", data)
    #     # print(response.status_code)
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(data['status'], 'S')
    #     # 验证 data['flag'] 中是否包含字符串 'Missing username or password'。如果包含这个字符串，则断言通过，否则断言失败。
    #     self.assertIn('Missing username or password', data['flag'])





    # # 学分完成情况测试
    # def test_student_scredit_complete(self):
    #     # 模拟的学生信息
    #     student_data = {
    #         "Keywords":{"Sno": "20100001"}  # 这里换成你数据库中存在的学号
    #     }
    #     # 模拟发送请求
    #     response = self.app.post('/Scredit_Inquire', json=student_data)
    #     data = response.get_json()
    #     print("try credit complete data = " ,  data)
    #     # 检查响应状态码
    #     if response.status_code == 200:
    #         # 打印响应内容
    #         print("OK, Response JSON:", response.json())
    #     else:
    #         print("NO, Failed to retrieve data. Status code:", response.status_code)
    
    
    
    
    
    # #课程查询测试
    # def test_course_inquire(self):
    #     # 构造课程查询的 JSON 数据
    #     query_data = {
    #         "Keywords":{
    #             "Cno": "00000001",
    #         "Cname": "数据库原理",
    #         "Credit": "3",
    #         "Ctno": "",
    #         "Tname": "",
    #         "CRtime": ""
    #         }
    #     }

    #     # 发送 POST 请求到课程查询路由
    #     response = self.app.post('/Course_Inquire', json=query_data)
    #     # 获取响应的 JSON 数据
    #     data = response.get_json()
    #     print("try course select data = " ,  data)
    #     # 检查响应状态码是否为 200
    #     if response.status_code == 200:
    #         # 打印响应内容
    #         print("OK, Response JSON:", response.json())
    #     else:
    #         print("NO, Failed to retrieve data. Status code:", response.status_code)





    # # 项目查询测试
    # def test_project(self):
    #     # 模拟的学生信息
    #     student_data = {
    #         "Keywords":{"Sno": "20100001"}  # 这里换成你数据库中存在的学号
    #     }
    #     # 模拟发送请求
    #     response = self.app.post('/Project_Inquire_S', json=student_data)
    #     data = response.get_json()
    #     print("try project data = " ,  data)
    #     # 检查响应状态码
    #     if response.status_code == 200:
    #         # 打印响应内容
    #         print("OK, Response JSON:", response.json())
    #     else:
    #         print("NO, Failed to retrieve data. Status code:", response.status_code)
    
    
    
    
    
    # #学生新建项目测试
    # def test_insert_project_into_database(self):
    # # 构造测试数据(项目号为0503XXXX)
    #     test_data = {
    #         "Info": {
    #             "Pname": "测试项目",
    #             "PSno": ["20200003", "20210004", "20310005"]
    #         },
    #         "PTno": "10500010"
    #     }

    #     # 调用待测试函数
    #     response = self.app.post('/Project_Insert/', json=test_data)
    #     # 获取响应的 JSON 数据
    #     data = response.get_json()
    #     print("try project insert data = " ,  data)
    #     # 检查响应状态码是否为 200
    #     if response.status_code == 200:
    #         # 打印响应内容
    #         print("OK, Response JSON:", response.json())
    #     else:
    #         print("NO, Failed to retrieve data. Status code:", response.status_code)
    
    
    
    
    
    #教室查询测试
    def test_classroom_inquire(self):
        # 构造课程查询的 JSON 数据
        query_data = {
            "Keywords":{
               "CRno": "A101",
            "CRtime": "一1-1",
            "Cno": "00000001",
            "Ctno": "001"
            }
        }
        print("try query classroom select data = " ,  query_data)
        # 发送 POST 请求到课程查询路由
        response = self.app.post('/ClassRoom_Inquire', json=query_data)
        # 获取响应的 JSON 数据
        data = response.get_json()
        print("try classroom select data = " ,  data)
        # 检查响应状态码是否为 200
        if response.status_code == 200:
            # 打印响应内容
            print("OK, Response JSON:", response.json())
        else:
            print("NO, Failed to retrieve data. Status code:", response.status_code)
            
            
            
            
       
    # #会议室查询测试代码     
    # def test_meetingroom_inquire_route(self):
    #     # 构造会议室查询的 JSON 数据
    #     query_data = {
    #         "Keywords": {"MRno": "M101"}
    #     }
    #     # 发送 POST 请求到会议室查询路由
    #     response = self.app.post('/MeetingRoom_Inquire', json=query_data)
    #     data = response.get_json()
    #     print("try meetingroom inquire data = " ,  data)
    #     # 检查响应状态码是否为 200
    #     if response.status_code == 200:
    #         # 打印响应内容
    #         print("OK, Response JSON:", response.json())
    #     else:
    #         print("NO, Failed to retrieve data. Status code:", response.status_code)
    
    
    
    
    
    # # 会议室预约测试代码
    # def test_meetingroom_inquire_success(self):
    #     # 构造测试数据
    #     query_data = {
    #         "Info": {
    #             "MRno": "M102",
    #             "MRtime": ["3-4", "7-8"],
    #             "Uno": "20100001"
    #         }
    #     }
    #     # 发送 POST 请求到会议室查询路由
    #     response = self.app.post('/MeetingRoomS_Inser_S', json=query_data)
    #     data = response.get_json()
    #     print("try project insert data = " ,  data)
    #     # 检查响应状态码是否为 200
    #     if response.status_code == 200:
    #         # 打印响应内容
    #         print("OK, Response JSON:", response.json())
    #     else:
    #         print("NO, Failed to retrieve data. Status code:", response.status_code)
    
    
    
    
    
    # #我的会议室预约查询测试
    # def test_my_meetingroom_inquire(self):
    #     # 构造课程查询的 JSON 数据
    #     query_data = {
    #         "Keywords": {"Uno": "20100001"}
    #     }
    #     print("try my meetingroom data = " ,  query_data)
    #     # 发送 POST 请求到课程查询路由
    #     response = self.app.post('/My_MeetingRoom_Inquire', json=query_data)
    #     # 获取响应的 JSON 数据
    #     data = response.get_json()
    #     print("try meetingroom select data = " ,  data)
    #     # 检查响应状态码是否为 200
    #     if response.status_code == 200:
    #         # 打印响应内容
    #         print("OK, Response JSON:", response.json())
    #     else:
    #         print("NO, Failed to retrieve data. Status code:", response.status_code)
    
    
    
    
    
    # # 学生会议室取消预约测试
    # def test_meetingroom_delete_S_route(self):
    #     # 准备测试数据
    #     query_data = {
    #         "Key":{"MRno": "M101", "Uno": "20100001"}
    #     }
    #     print("try my delete meetingroom data = " ,  query_data)
    #     # 发送 POST 请求到课程查询路由
    #     response = self.app.post('/My_MeetingRoom_Delete_S', json=query_data)
    #     # 获取响应的 JSON 数据
    #     data = response.get_json()
    #     print("try classroom select data = " ,  data)
    #     # 检查响应状态码是否为 200
    #     if response.status_code == 200:
    #         # 打印响应内容
    #         print("OK, Response JSON:", response.json())
    #     else:
    #         print("NO, Failed to retrieve data. Status code:", response.status_code)
        
        
        
        
        
    # 添加更多的测试用例...

if __name__ == '__main__':
    unittest.main()
