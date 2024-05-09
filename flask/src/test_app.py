import unittest
from app import app

class TestApp(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    # 修改后的测试用例示例
    def test_login_missing_credentials(self):
        response = self.app.post('/login/', json={"Uno": "2001", "Key": "student1"})
        data = response.get_json()
        # print(data)
        # print(response.status_code)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['status'], 'S')
        # 验证 data['flag'] 中是否包含字符串 'Missing username or password'。如果包含这个字符串，则断言通过，否则断言失败。
        self.assertIn('Missing username or password', data['flag'])


    # 添加更多的测试用例...

if __name__ == '__main__':
    unittest.main()
