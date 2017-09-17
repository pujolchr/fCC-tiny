const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // we got a query?
  // yes display the data
  // no display just the form
  const source = req.query.url;
 
  res.render('index', {
    title: 'fCC-tiny',
    author: 'Christan Pujol',
    url: source,
    tiny: `${req.host}/tiny/1`,
  });
});

module.exports = router;
