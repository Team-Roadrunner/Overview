DROP DATABASE IF EXISTS "overview";

CREATE DATABASE "overview";

\c "overview";

CREATE TABLE productInfo (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  slogan VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  default_price VARCHAR NOT NULL
);

CREATE TABLE productStyle (
  id SERIAL PRIMARY KEY,
  productId INTEGER,
  name VARCHAR NOT NULL,
  original_price VARCHAR NOT NULL,
  sale_price VARCHAR NOT NULL,
  "default?" BOOLEAN,
  FOREIGN KEY(productId) REFERENCES productInfo(id)
);

CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  style_id SERIAL,
  quantity INTEGER NOT NULL,
  size VARCHAR NOT NULL,
  FOREIGN KEY(style_id) REFERENCES productStyle(id)
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  feature VARCHAR NOT NULL,
  value VARCHAR NOT NULL,
  FOREIGN KEY(product_id) REFERENCES productInfo(id)
);

CREATE TABLE photos (
  id INT PRIMARY KEY,
  style_id INTEGER,
  thumbnail_url VARCHAR NOT NULL,
  url VARCHAR NOT NULL,
  FOREIGN KEY(style_id) REFERENCES productStyle(id)
);

CREATE TABLE related (
  id INT PRIMARY KEY,
  current_product_id INTEGER,
  related_product_id INTEGER
);

\COPY productinfo FROM '/Users/sophiacheong/Desktop/Hackreactor/Overview/product.csv' DELIMITER ',' CSV HEADER;
\COPY productstyle FROM '/Users/sophiacheong/Desktop/Hackreactor/Overview/styles.csv' DELIMITER ',' CSV HEADER;
\COPY skus FROM '/Users/sophiacheong/Desktop/Hackreactor/Overview/skus.csv' DELIMITER ',' CSV HEADER;
\COPY features FROM '/Users/sophiacheong/Desktop/Hackreactor/Overview/features.csv' DELIMITER ',' CSV HEADER;
\COPY photos FROM '/Users/sophiacheong/Desktop/Hackreactor/Overview/photos.csv' DELIMITER ',' CSV HEADER;
\COPY related FROM '/Users/sophiacheong/Desktop/Hackreactor/Overview/related.csv' DELIMITER ',' CSV HEADER;