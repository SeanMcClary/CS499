import time
from selenium.webdriver.common.by import By

def get_event_data(row):
  results = dict()
  results['event_id'] = int(row.find_element(By.XPATH, './/td/div/a').get_attribute('href').split('/')[-1])
  results['rating'] = int(row.find_element(By.XPATH, './/td[4]').get_attribute('innerText') or -1)
  results['place'] = int(row.find_element(By.XPATH, './/td[5]').get_attribute('innerText'))
  results['stroke_ct'] = int(row.find_element(By.XPATH, './/td[6]').get_attribute('innerText'))
  results['cash'] = int(row.find_element(By.XPATH, './/td[7]').get_attribute('innerText'))

  return results

def scrape_player_events(scraper, pdga_no, profile):
  scraper.get_url(f'https://statmando.com/player/{profile}/profile')
  options = scraper.get_elements('xpath', '//option[starts-with(@value,"DGPT")]')
  for option in options:
    option.click()
  time.sleep(3)
  rows = scraper.get_elements('xpath', '//table[@id="history"]/tbody/tr')
  for row in rows:
    new_event_data = dict()
    new_event_data['pdga_no'] = pdga_no
    new_event_data.update(get_event_data(row))
    # Get remaining fields and insert into database
