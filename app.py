from selenium import webdriver
from mysql import connector

from settings import MYSQL_DB_USERNAME
from settings import MYSQL_DB_PASSWORD
from settings import MYSQL_DB_HOST
from settings import MYSQL_DB_NAME

from scraper import Scraper

options = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=options)

mysql_connector = connector.connect(
  user=MYSQL_DB_USERNAME,
  password=MYSQL_DB_PASSWORD,
  host=MYSQL_DB_HOST,
  database=MYSQL_DB_NAME
)

scraper = Scraper(driver, mysql_connector)

scraper.get_url('https://statmando.com/rankings/official/mpo')

input()
