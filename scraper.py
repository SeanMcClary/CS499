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

  def __init__(self, driver):
    print('Initializing scraper')
    self.driver = driver

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

  def quit(self):
    self.driver.quit()
