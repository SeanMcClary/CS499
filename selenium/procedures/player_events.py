import time
from selenium.webdriver.common.by import By

def get_event_data(row):
  results = dict()
  results['event_id'] = int(row.find_element(By.XPATH, './/td/div/a').get_attribute('href').split('/')[-1])
  results['rating'] = int(row.find_element(By.XPATH, './/td[4]').get_attribute('innerText') or -1)
  results['place'] = int(row.find_element(By.XPATH, './/td[5]').get_attribute('innerText'))
  results['stroke_ct'] = int(row.find_element(By.XPATH, './/td[6]').get_attribute('innerText'))
  try:
    results['cash'] = int(row.find_element(By.XPATH, './/td[7]').get_attribute('innerText'))
  except ValueError:
    results['cash'] = None
    print('No cash given for the event')

  return results

def get_pdga_event_data(scraper):
  results = dict()
  try:
    results['event_name'] = scraper.get_element('xpath', '//div[@class="panel-pane pane-page-title"]/div/h1').get_attribute('innerText')
  except AttributeError:
    print('Event page not found')
    return None
  try:
    results['website'] = scraper.get_element('xpath', '//li[@class="tournament-website"]').get_attribute('innerText')[9::]
  except AttributeError:
    results['website'] = None
    print('Event has no website listed')

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
  try:
    start_date, end_date = date_range.split(' to ')
    start_day, start_month = start_date.split('-')
    end_day, end_month, year = end_date.split('-')
    results['start_dt'] = f'{year}-{month_dict[start_month]:0>2}-{start_day:0>2}'
    results['end_dt'] = f'{year}-{month_dict[end_month]:0>2}-{end_day:0>2}'
  except ValueError:
    day, month, year = date_range.split('-')
    results['start_dt'] = f'{year}-{month_dict[month]:0>2}-{day:0>2}'
    results['end_dt'] = f'{year}-{month_dict[month]:0>2}-{day:0>2}'

  location = scraper.get_element('xpath', '//li[@class="tournament-location"]').get_attribute('innerText')[10::]
  components = location.split(', ')
  if len(components) == 3:
    results['city'], results['state'], results['country'] = components
  else:
    results['city'] = components[0]
    results['country'] = components[1]
    results['state'] = None

  return results


def scrape_player_events(scraper, pdga_no, profile):
  scraper.get_url(f'https://statmando.com/player/{profile}/profile')
  options = scraper.get_elements('xpath', '//option[starts-with(@value,"DGPT")]')
  if len(options) == 0:
    return
  for option in options:
    option.click()
  time.sleep(3)
  rows = scraper.get_elements('xpath', '//table[@id="history"]/tbody/tr')
  for row in rows:
    pdga_link = row.find_element(By.XPATH, './/td/div/a').get_attribute('href')
    new_event_data = dict()
    new_event_data.update(get_event_data(row))
    scraper.driver.execute_script('window.open(\'\');')
    scraper.driver.switch_to.window(scraper.driver.window_handles[1])
    scraper.get_url(pdga_link)
    time.sleep(3)
    pdga_event_data = get_pdga_event_data(scraper)
    if pdga_event_data:
      new_event_data.update(pdga_event_data)
      scraper.insert_event_result(new_event_data, pdga_no)
    scraper.driver.close()
    scraper.driver.switch_to.window(scraper.driver.window_handles[0])
