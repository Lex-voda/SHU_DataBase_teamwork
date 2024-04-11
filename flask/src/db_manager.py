import psycopg2


class DBManager:
    def __init__(self, db_params):
        self.db_params = db_params

    def connect_db(self, func):
        def wrapper(*args, **kwargs):
            connection = psycopg2.connect(**self.db_params)
            cursor = connection.cursor()
            try:
                result = func(cursor, *args, **kwargs)
                connection.commit()
                return result
            except Exception as e:
                connection.rollback()
                raise e
            finally:
                cursor.close()
                connection.close()

        return wrapper
