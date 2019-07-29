DROP DATABASE IF EXISTS stock_tracker;

CREATE DATABASE stock_tracker;

USE stock_tracker;

CREATE TABLE users (
  id             INT NOT NULL AUTO_INCREMENT,
  goog_id        VARCHAR (40) NOT NULL,
  full_name      VARCHAR (50) NOT NULL,
  first_name     VARCHAR (50) NOT NULL,
  last_name      VARCHAR (50) NOT NULL,
  email          VARCHAR (100) NOT NULL,
  img_url        VARCHAR (500) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE purchases (
  id             INT NOT NULL AUTO_INCREMENT,
  user_id        INT NOT NULL,
  stock_ticker   VARCHAR (10) NOT NULL,
  num_of_shares  INT NOT NULL, 
  share_price    NUMERIC(10, 4) NOT NULL,
  date_purchased DATETIME NOT NULL,
  sp500_price    NUMERIC(10, 4) NOT NULL,
  nasdaq_price   NUMERIC(10, 4) NOT NULL,
  dow_price      NUMERIC(10, 4) NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE sp_historical (
  date              VARCHAR(20) NOT NULL,
  uClose            NUMERIC(10, 4) NOT NULL,
  uOpen             NUMERIC(10, 4) NOT NULL,
  uHigh             NUMERIC(10, 4) NOT NULL,
  uLow              NUMERIC(10, 4) NOT NULL,  
  uVolume           BIGINT NOT NULL,
  close             NUMERIC(10, 4) NOT NULL,
  open              NUMERIC(10, 4) NOT NULL,
  high              NUMERIC(10, 4) NOT NULL,
  low               NUMERIC(10, 4) NOT NULL,
  volume            BIGINT NOT NULL,
  changed            NUMERIC(10, 6),
  changePerc        NUMERIC(10, 6),
  label             VARCHAR (50) NOT NULL,
  changeOverTime    NUMERIC(8, 6) NOT NULL
);

CREATE TABLE nasdaq_historical (
  date              DATE NOT NULL,
  uClose            NUMERIC(10, 4) NOT NULL,
  uOpen             NUMERIC(10, 4) NOT NULL,
  uHigh             NUMERIC(10, 4) NOT NULL,
  uLow              NUMERIC(10, 4) NOT NULL,  
  uVolume           BIGINT NOT NULL,
  close             NUMERIC(10, 4) NOT NULL,
  open              NUMERIC(10, 4) NOT NULL,
  high              NUMERIC(10, 4) NOT NULL,
  low               NUMERIC(10, 4) NOT NULL,
  volume            BIGINT NOT NULL,
  changed            NUMERIC(10, 6) NOT NULL,
  changePerc     NUMERIC(10, 6) NOT NULL,
  label             VARCHAR (50) NOT NULL,
  changeOverTime    NUMERIC(8, 6) NOT NULL
);

CREATE TABLE dow_historical (
  date              DATE NOT NULL,
  uClose            NUMERIC(10, 4) NOT NULL,
  uOpen             NUMERIC(10, 4) NOT NULL,
  uHigh             NUMERIC(10, 4) NOT NULL,
  uLow              NUMERIC(10, 4) NOT NULL,  
  uVolume           BIGINT NOT NULL,
  close             NUMERIC(10, 4) NOT NULL,
  open              NUMERIC(10, 4) NOT NULL,
  high              NUMERIC(10, 4) NOT NULL,
  low               NUMERIC(10, 4) NOT NULL,
  volume            BIGINT NOT NULL,
  changed           NUMERIC(10, 6) NOT NULL,
  changePerc        NUMERIC(10, 6) NOT NULL,
  label             VARCHAR (50) NOT NULL,
  changeOverTime    NUMERIC(8, 6) NOT NULL
);

LOAD DATA LOCAL INFILE './data/fakeUser.txt' 
INTO TABLE users 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE './data/fakePurchases.txt' 
INTO TABLE purchases 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '/'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE './data/historicaldata-voo-max.csv' 
INTO TABLE sp_historical
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE './data/historicaldata-qqq-max.csv' 
INTO TABLE nasdaq_historical 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE './data/historicaldata-dia-max.csv' 
INTO TABLE dow_historical 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.

 * EXAMPLE INSERT QUERY (User Purchase)
 *   INSERT INTO purchases (user_id, stock_ticker, num_of_shares, share_price, date_purchased, sp500_price, nasdaq_price, dow_price)
 *   VALUES (1, "AAPL", 15, 180.51, "2019-06-14 09:30:00", 265.71, 182.44, 261.24); 

 * ENDPOINT FOR HISTORICAL DATA https://cloud.iexapis.com/stable/stock/{symbol}/chart/{range}?token=TOKEN_HERE
 * range is 1M, 3M, 6M, 1Y, 2Y, 5Y, max
*/
 
