# CS499
This application scrapes for professional disc golf player and event statistics.
### Setup
Running the scraper requires the use of the selenium python package. To install this module, complete the following steps:
- Create a python virtual environment, run `python -m venv venv` to create a python virtual environment in a folder named venv.
- Create a mysql database instance. Be sure to grant sufficient permissions to the database user you create so that the scraper can make inserts into the table.
- Activate the python virtual environment by running the activate script located in venv/bin or venv/Scripts depending on what operating system the application is being run on.
- Run the following command to install python dependencies:
```
pip install selenium mysql-connector-python python-dotenv
```
- Set the database user, password, host, and database name by entering credentials into your .env file. An example file, .env.example is included in the repository to assist with setting environment variables.

Any time the application is to be run, the virtual environment will need to be activated by running the activate script.
