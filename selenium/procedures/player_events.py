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

def get_pdga_event_data(scraper):
  results = dict()
  results['event_name'] = scraper.get_element('xpath', '//div[@class="panel-pane pane-page-title"]/div/h1').get_attribute('innerText')
  results['website'] = scraper.get_element('xpath', '//li[@class="tournament-website"]').get_attribute('innerText')[9::]

  month_dict = {
      "Jan": 1,
      "Feb": 2,
      "Mar": 3,
      "Apr": 4,
      "May": 5,
      "Jun": 6,
      "Jul": 7,
      "Aug": 8,
      "Sep": 9,
      "Oct": 10,
      "Nov": 11,
      "Dec": 12,
  }
  date_range = scraper.get_element('xpath', '//li[@class="tournament-date"]').get_attribute('innerText')[6::]
  start_date, end_date = date_range.split(' to ')
  start_day, start_month = start_date.split('-')
  end_day, end_month, year = end_date.split('-')
  results['start_dt'] = f'{start_day:0>2}-{month_dict[start_month]:0>2}-{year}'
  results['end_dt'] = f'{end_day:0>2}-{month_dict[end_month]:0>2}-{year}'

  location = scraper.get_element('xpath', '//li[@class="tournament-location"]').get_attribute('innerText')[10::]
  results['city'], results['state'], results['country'] = location.split(', ')

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
