const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // we got a query?
  // yes display the data
  // no display just the form
  const source = req.query.url;

  const obj = {
    title: 'fCC-tiny',
    author: 'Christan Pujol',
    url: source,
  };
  if (source) {
    // get the tiny form
    obj.tiny = `${req.hostname}/1/${source}`;
  }
  res.render('index', obj);
});

router.get('/:tiny', (req, res, next) => {
  res.send('redirect');
});


module.exports = router;
