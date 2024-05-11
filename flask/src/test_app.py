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
    #         "Sno": "20100001"  # 这里换成你数据库中存在的学号
    #     }
    #     # 模拟发送请求
    #     response = self.app.get('/Scredict_Inquire/', json=student_data)
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
    #         "Cno": "00000001",
    #         "Cname": "数据库原理",
    #         "Credit": "3",
    #         "Ctno": "",
    #         "Tname": "",
    #         "CRtime": "",
    #     }

    #     # 发送 POST 请求到课程查询路由
    #     response = self.app.post('/Course_Inquire/', json=query_data)
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
    #         "Sno": "20100001"  # 这里换成你数据库中存在的学号
    #     }
    #     # 模拟发送请求
    #     response = self.app.get('/Project_Inquire_S/', json=student_data)
    #     data = response.get_json()
    #     print("try project data = " ,  data)
    #     # 检查响应状态码
    #     if response.status_code == 200:
    #         # 打印响应内容
    #         print("OK, Response JSON:", response.json())
    #     else:
    #         print("NO, Failed to retrieve data. Status code:", response.status_code)
    
    
    
    
    
    #课程查询测试
    def test_classroom_inquire(self):
        # 构造课程查询的 JSON 数据
        query_data = {
            "CRno": "A101",
            "CRtime": "一1-1",
            "Cno": "00000001",
            "Ctno": "001",
        }
        print("try query classroom select data = " ,  query_data)
        # 发送 POST 请求到课程查询路由
        response = self.app.post('/ClassRoom_Inquire/', json=query_data)
        # 获取响应的 JSON 数据
        data = response.get_json()
        print("try classroom select data = " ,  data)
        # 检查响应状态码是否为 200
        if response.status_code == 200:
            # 打印响应内容
            print("OK, Response JSON:", response.json())
        else:
            print("NO, Failed to retrieve data. Status code:", response.status_code)
            
    # 添加更多的测试用例...

if __name__ == '__main__':
    unittest.main()
