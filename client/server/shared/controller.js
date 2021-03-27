const axios = require('axios');
// const token = require('../../config.js');

const sharedController = (req, res) => {
  let method = req.method;
  let url = req.url;
  let body = req.body || null;
  axios({
    method: `${method}`,
    url: `http://54.241.96.181${url}`,
    data: body,
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
      console.log(err)
      res.send(err)
    });
};

module.exports = sharedController;
