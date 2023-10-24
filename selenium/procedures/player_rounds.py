import time
from selenium.webdriver.common.by import By

def get_round_data(row):
  results = dict()
  results['event_id'] = int(row.find_element(By.XPATH, './/td/div/a').get_attribute('href').split('/')[-1])
  results['year'] = int(row.find_element(By.XPATH, './/td[2]').get_attribute('innerText'))
  results['round_number'] = int(row.find_element(By.XPATH, './/td[3]').get_attribute('innerText'))
  results['round_rating'] = int(row.find_element(By.XPATH, './/td[4]').get_attribute('innerText'))
  results['score'] = int(row.find_element(By.XPATH, './/td[5]').get_attribute('innerText'))
  results['par_score'] = int(row.find_element(By.XPATH, './/td[6]').get_attribute('innerText'))
  results['under_par_ct'] = int(row.find_element(By.XPATH, './/td[7]').get_attribute('innerText'))
  results['par_ct'] = int(row.find_element(By.XPATH, './/td[8]').get_attribute('innerText'))
  results['over_par_ct'] = int(row.find_element(By.XPATH, './/td[9]').get_attribute('innerText'))
  results['holes_played'] = int(row.find_element(By.XPATH, './/td[13]').get_attribute('innerText'))
  final_round = row.find_element(By.XPATH, './/td[14]').get_attribute('innerText')
  if final_round == 'N':
    results['final_round'] = False
  else:
    results['final_round'] = True

  return results

def scrape_player_rounds(scraper, profile):
  scraper.get_url(f'https://statmando.com/player/{profile}/profile')
  scraper.wait_for_element('id', 'tab-round-results').click()
  time.sleep(3)
  rows = scraper.get_elements('xpath', '//table[@id="round-results"]/tbody/tr')
  # For each row, record the scraped results
