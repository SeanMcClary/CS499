from selenium import webdriver
from selenium.webdriver.chrome.service import Service

options = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=options)

driver.get('https://statmando.com/')
input()
