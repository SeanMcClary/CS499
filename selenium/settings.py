from dotenv import load_dotenv
import os

load_dotenv()

MYSQL_DB_USERNAME = os.getenv('MYSQL_DB_USERNAME')
MYSQL_DB_PASSWORD = os.getenv('MYSQL_DB_PASSWORD')
MYSQL_DB_HOST = os.getenv('MYSQL_DB_HOST')
MYSQL_DB_NAME = os.getenv('MYSQL_DB_NAME')
