const axios = require('axios');
// const token = require('../../config.js')

const questionsController = (req, res) => {
  let method = req.method;
  let url = req.url;
  let body = req.body || null;
  console.log(method, url)
  axios({
    method: `${method}`,
    url: `http://3.16.45.230${url}`,
    headers: {
      "Accept": "application/json, text/plain, */*",
      "User-Agent": "axios/0.21.1",
    },
    data: body,
  })
    .then((data) => {
      res.send(data.data)
    })
    .catch(err => {
      res.send(err)
    });
};

module.exports = questionsController;
