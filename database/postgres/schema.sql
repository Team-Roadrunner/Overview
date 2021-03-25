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
  size VARCHAR NOT NULL,
  quantity INTEGER NOT NULL,
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

-- THIS IS FOR THE VIRUAL MACHINE UBUNTU
-- \COPY productinfo FROM '/home/ubuntu/csvFiles/product.csv' DELIMITER ',' CSV HEADER;
-- \COPY productstyle FROM '/home/ubuntu/csvFiles/styles.csv' DELIMITER ',' CSV HEADER;
-- \COPY skus FROM '/home/ubuntu/csvFiles/skus.csv' DELIMITER ',' CSV HEADER;
-- \COPY features FROM '/home/ubuntu/csvFiles/features.csv' DELIMITER ',' CSV HEADER;
-- \COPY photos FROM '/home/ubuntu/csvFiles/photos.csv' DELIMITER ',' CSV HEADER;
-- \COPY related FROM '/home/ubuntu/csvFiles/related.csv' DELIMITER ',' CSV HEADER;


-- RUN THIS AFTER TABLES AND CSV FILES ARE MADE.
CREATE TABLE fullStyle AS SELECT productstyle.productid, json_agg(json_build_object('style_id', productstyle.id, 'name', productstyle.name,
'original_price', productstyle.original_price, 'sale_price', productstyle.sale_price,
'default?', productstyle."default?", 'photos', photos, 'skus', skus)) results FROM productstyle
LEFT JOIN (SELECT skus.style_id, json_object_agg(skus.id, json_build_object('quantity', skus.quantity, 'size', skus.size)) skus
FROM skus GROUP BY skus.style_id ) skus ON skus.style_id = productstyle.id
LEFT JOIN (SELECT photos.style_id, json_agg(json_build_object('thumbnail_url' , photos.url, 'url', photos.thumbnail_url))
photos FROM photos GROUP BY photos.style_id) photos ON photos.style_id = productstyle.id
GROUP BY productstyle.productid;

-- CREATE TABLE relatedID as SELECT productinfo.id, json_agg(related_product_id) AS related FROM productinfo
-- LEFT JOIN related ON related.current_product_id=productinfo.id GROUP BY productinfo.id ORDER BY productinfo.id ASC;
