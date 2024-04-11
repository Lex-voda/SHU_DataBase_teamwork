import configparser
import os


class ConfigManager:
    def __init__(self, file_name="./../conf/config.ini"):
        self.config = self.read_config(file_name)

    def read_config(self, file_name):
        script_dir = os.path.dirname(os.path.realpath(__file__))
        config_path = os.path.join(script_dir, file_name)
        config = configparser.ConfigParser()
        config.read(config_path)
        return config

    def get_db_params(self):
        return {
            "dbname": self.config["DATABASE"]["DB_NAME"],
            "user": self.config["DATABASE"]["DB_USER"],
            "password": self.config["DATABASE"]["DB_PASSWORD"],
            "host": self.config["DATABASE"]["DB_HOST"],
            "port": self.config["DATABASE"]["DB_PORT"],
        }

    def get_secret_key(self):
        return self.config["SECRET_KEY"]["SECRET_KEY"]
