/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  http.get('http://localhost:8080/api/products?page=1&count=10');
  sleep(1);
}
