from selenium import webdriver
from selenium.webdriver.chrome.service import Service

from scraper import Scraper

options = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=options)

scraper = Scraper(driver)

scraper.get_url('https://statmando.com/rankings/official/mpo')

input()
