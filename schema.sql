DROP DATABASE IF EXISTS stock_tracker;

CREATE DATABASE stock_tracker;

USE stock_tracker;

CREATE TABLE users (
  id             INT NOT NULL AUTO_INCREMENT,
  username       VARCHAR (50) NOT NULL,
  first_name     VARCHAR (50) NOT NULL,
  last_name      VARCHAR (50) NOT NULL,
  email          VARCHAR (100) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE purchases (
  id             INT NOT NULL AUTO_INCREMENT,
  user_id        INT NOT NULL,
  num_of_shares  INT NOT NULL, 
  share_price    NUMERIC(10, 4) NOT NULL,
  date_purchased DATE NOT NULL,
  sp500_price    NUMERIC(10, 4) NOT NULL,
  nasdaq_price   NUMERIC(10, 4) NOT NULL,
  dow_price      NUMERIC(10, 4) NOT NULL,
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
