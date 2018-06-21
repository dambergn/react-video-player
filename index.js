'use strict';

const PORT = 8082;
const express = require('express');

const app = express();

// app.use(express.static('./public'));

// app.use('/', (req, res) => {
//   res.sendFile('index.html', { root: './public' });
// });

app.use(express.static('./dist'));

app.use('/', (req, res) => {
  res.sendFile('index.html', { root: './dist' });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});