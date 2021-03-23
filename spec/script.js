/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '15s', target: 100 },
    { duration: '10s', target: 200 }, // normal load
    { duration: '15s', target: 200 },
    { duration: '10s', target: 300 }, // around the breaking point
    { duration: '15s', target: 300 },
    { duration: '10s', target: 400 }, // beyond the breaking point
    { duration: '15s', target: 400 },
    { duration: '20s', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3000/api'; // make sure this is not production

  const responses = http.batch([
    [
      'GET',
      `${BASE_URL}/products/1/styles`,
      null,
    ],
    [
      'GET',
      `${BASE_URL}/products/19284/styles`,
      null,
    ],
    [
      'GET',
      `${BASE_URL}/products/194284/styles`,
      null,
    ],
    [
      'GET',
      `${BASE_URL}/products/100011/styles`,
      null,
    ],
  ]);

  sleep(1);
}
