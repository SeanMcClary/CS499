from selenium import webdriver
from mysql import connector

from settings import MYSQL_DB_USERNAME
from settings import MYSQL_DB_PASSWORD
from settings import MYSQL_DB_HOST
from settings import MYSQL_DB_NAME

from scraper import Scraper
from procedures.player_rounds import scrape_player_rounds
import datetime

options = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=options)

mysql_connector = connector.connect(
  user=MYSQL_DB_USERNAME,
  password=MYSQL_DB_PASSWORD,
  host=MYSQL_DB_HOST,
  database=MYSQL_DB_NAME
)

scraper = Scraper(driver, mysql_connector)

player_list = scraper.get_players()

start = datetime.datetime.now()
for player in player_list:
  try:
    scraper.get_url('https://statmando.com/player/{}/profile'.format(player[1]))
    scrape_player_rounds(scraper,player[0],player[1])
  except:
    print(player[0],player[1],' could not be scraped')
finish = datetime.datetime.now()
print('start',start,'finish',finish)
