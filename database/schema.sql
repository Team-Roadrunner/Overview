DROP DATABASE IF EXISTS Overview;

CREATE DATABASE Overview;

USE DATABASE Overview;

CREATE TABLE (IF NOT EXISTS) productInfo (
  id SERIAL,
  name VARCHAR NOT NULL,
  slogan VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  default_price VARCHAR NOT NULL,
  PRIMARY KEY(id),
);

CREATE TABLE (IF NOT EXISTS) productStyle (
  id SERIAL,
  product_id INTEGER,
  name VARCHAR NOT NULL,
  original_price VARCHAR NOT NULL,
  sale_price VARCHAR NOT NULL,
  default BOOLEAN,
  skus_id (JOINT WITH SKUS ID),
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) REFERENCES productInfo(id),
);

CREATE TABLE (IF NOT EXISTS) features (
  id SERIAL,
  product_id INTEGER,
  feature VARCHAR NOT NULL,
  value VARCHAR NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) REFERENCES productInfo(id)
);

CREATE TABLE (IF NOT EXISTS) skus (
  id SERIAL,
  style_id INTEGER,
  quantity VARCHAR NOT NULL,
  size VARCHAR NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(style_id) REFERENCES productStyle(id),
);

CREATE TABLE (IF NOT EXISTS) photos (
  id SERIAL,
  style_id INTEGER,
  thumbnail_url VARCHAR NOT NULL,
  url VARCHAR NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(style_id) REFERENCES productStyle(id),
);

