import unittest
from app import app

class TestApp(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    # # 修改后的测试用例示例
    # def test_login_missing_credentials(self):
    #     response = self.app.post('/Login/', json={"Uno": "2001", "Key": "student1"})
    #     data = response.get_json()
    #     # print(data)
    #     # print(response.status_code)
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(data['status'], 'S')
    #     # 验证 data['flag'] 中是否包含字符串 'Missing username or password'。如果包含这个字符串，则断言通过，否则断言失败。
    #     self.assertIn('Missing username or password', data['flag'])

    def test_student_scredit_complete(self):
        # 模拟的学生信息
        student_data = {
            "Sno": "S0000001"  # 这里换成你数据库中存在的学号
        }
        # 模拟发送请求
        response = self.app.get('/Scredict_Inquire/', json=student_data)
        data = response.get_json()
        print("data equal " ,  data)
        # 检查响应状态码
        if response.status_code == 200:
            # 打印响应内容
            print("OK, Response JSON:", response.json())
        else:
            print("NO, Failed to retrieve data. Status code:", response.status_code)
    
    # 添加更多的测试用例...

if __name__ == '__main__':
    unittest.main()
