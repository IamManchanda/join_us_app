CREATE DATABASE join_us_app;
USE join_us_app;

CREATE TABLE users (
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (email)
);
