class Scraper:
  def __init__(self, driver):
    print('Initializing scraper')
    self.driver = driver

  def get_url(self, url):
    self.driver.get(url)
