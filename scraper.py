from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import TimeoutException

from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class Scraper:
  by_aliases = {
    'id': By.ID,
    'name': By.NAME,
    'xpath': By.XPATH,
    'link_text': By.LINK_TEXT,
    'partial_link_text': By.PARTIAL_LINK_TEXT,
    'tag_name': By.TAG_NAME,
    'class_name': By.CLASS_NAME,
    'css_selector': By.CSS_SELECTOR
  }

  def __init__(self, driver, db):
    print('Initializing scraper')
    self.driver = driver
    self.db = db
    self.cursor = db.cursor()

  def get_url(self, url):
    self.driver.get(url)

  def wait(self, time):
    self.driver.implicitly_wait(time)

  def wait_for_element(self, by, identifier):
    try:
      element = WebDriverWait(self.driver, 10).until(
        EC.presence_of_element_located((self.by_aliases[by], identifier))
      )
      return element
    except TimeoutException:
      print(f'Timeout error: Problem finding element with {by} of "{identifier}"')
      self.quit()

  def get_element(self, by, identifier):
    try:
      element = self.driver.find_element(self.by_aliases[by], identifier)
      return element
    except KeyError:
      print('Invalid detection method, please refer to the scraper by_aliases member')
    except NoSuchElementException:
      print(f'No element with {by} of "{identifier}" found')

  def get_elements(self, by, identifier):
    try:
      elements = self.driver.find_elements(self.by_aliases[by], identifier)
      return elements
    except KeyError:
      print('Invalid detection method, please refer to the scraper by_aliases member')
    except NoSuchElementException:
      print(f'No elements with {by} of "{identifier}" found')

  def quit(self):
    self.driver.quit()

  def insert_event_result(self, result, pdga_no):
    sql = 'INSERT INTO event_results (pdga_no, event_id, event_rating, place, stroke_ct, cash) VALUES (%s, %s, %s, %s, %s, %s)'
    vals = (
        pdga_no,
        result['event_id'],
        result['rating'],
        result['place'],
        result['stroke_ct'],
        result['cash']
    )
    self.cursor.execute(sql, vals)
    self.db.commit()
    print(self.cursor.rowcount, 'row(s) inserted into event_results')

  def insert_round_result(self, result, pdga_no):
    sql = 'INSERT INTO rounds (pdga_no, event_id, round_no, round_rating, score, par_score, under_par_ct, par_ct, over_par_ct, holes_played, final_round) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
    vals = (
        pdga_no,
        result['event_id'],
        result['round_number'],
        result['round_rating'],
        result['score'],
        result['par_score'],
        result['under_par_ct'],
        result['par_ct'],
        result['over_par_ct'],
        result['holes_played'],
        result['final_round']
    )
    self.cursor.execute(sql, vals)
    self.db.commit()
    print(self.cursor.rowcount, 'row(s) inserted into rounds')
