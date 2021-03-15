const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname + '/../react-client/dist')));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));