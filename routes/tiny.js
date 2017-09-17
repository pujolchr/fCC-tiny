const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  const obj = {};
  // check if id is a valid url
  // check if we already got it
  // build or retrive the tiny part
  obj.url = 'http://www.naga.no';
  obj.tiny = 'http://tiny/1';
  res.send(obj);
});

module.exports = router;
