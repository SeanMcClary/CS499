# CS499
This repository contains all the source code used in the CS499 capstone project by Sean and Noah in Fall 2023. This application scrapes for professional disc golf player and event statistics. From the data, an express backend uses R to pull in round data from a database and build models, which can be used to predict scores based on a number of factors.
### Database Connector Setup
A mysql database is required for this application. Ensure that a user or role exists that can select and insert into the tables in the database.
Set the database user, password, host, port, and database name environment variables by entering credentials into your .env file. An example file, .env.example is included in the repository to assist with setting environment variables. This configuration file is used both by R and the Selenium scraper to access and insert data into the database. Ensure that the right tables are created with the correct set of columns. This can be done by importing a database dump or by means of recreating the structure.
### Selenium Setup
Running the scraper requires the use of the selenium python package. To install this module, complete the following steps:
- Create a python virtual environment, run `python -m venv venv` to create a python virtual environment in a folder named venv.
- Create a mysql database instance. Be sure to grant sufficient permissions to the database user you create so that the scraper can select and make inserts into the tables.
- Activate the python virtual environment by running the activate script located in venv/bin or venv/Scripts depending on what operating system the application is being run on.
- Run the following command to install python dependencies:
```
pip install selenium mysql-connector-python python-dotenv
```
Any time the application is to be run, the virtual environment will need to be activated by running the activate script.
### Express Setup
A number of dependencies are required to run the express backend with R.
- Install nodejs
- Install R (On ubuntu: `sudo apt install r-base`)
- Install the MySQL connector for R
  - Open the interactive R console on the command line `R`
  - Run `install.packages("RMySQL")`
  - Quit the interactive R console: `q()`
- Run `npm install` to install all node dependencies

The express instance can be started by running `npm run start`
