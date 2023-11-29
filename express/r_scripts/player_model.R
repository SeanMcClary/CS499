library(RMariaDB)

readRenviron('.env')

mysqlconnection <- dbConnect(
  RMariaDB::MariaDB(),
  dbname = Sys.getenv('MYSQL_DB_NAME'),
  host = Sys.getenv('MYSQL_DB_HOST'),
  port = strtoi(Sys.getenv('MYSQL_DB_PORT')),
  user = Sys.getenv('MYSQL_DB_USERNAME'),
  password = Sys.getenv('MYSQL_DB_PASSWORD'),
)

getPredictedScore <- function (x) {
  query <- 'SELECT event_rating, stroke_ct FROM event_results WHERE pdga_no = ? AND event_rating > 0'
  result <- dbSendQuery(mysqlconnection, query)
  dbBind(result, list(x))
  data.frame <- dbFetch(result)
  lmRound <- lm(stroke_ct~event_rating, data.frame)
  return(lmRound$coefficients)
}
