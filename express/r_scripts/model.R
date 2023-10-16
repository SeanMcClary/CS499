library(RMySQL)

readRenviron('.env')

mysqlconnection <- dbConnect(
  RMySQL::MySQL(),
  dbname = Sys.getenv('MYSQL_DB_NAME'),
  host = Sys.getenv('MYSQL_DB_HOST'),
  port = strtoi(Sys.getenv('MYSQL_DB_PORT')),
  user = Sys.getenv('MYSQL_DB_USERNAME'),
  password = Sys.getenv('MYSQL_DB_PASSWORD'),
)

getRounds <- function (x) {
  result <- dbSendQuery(mysqlconnection, 'SELECT round_rating, score FROM rounds')
  data.frame <- fetch(result)
  lmRound <- lm(score~round_rating, data.frame)
  return(lmRound$coefficients)
}
