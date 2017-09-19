'use strict';

const shortid = require('shortid');
const express = require('express');
const http = require('http');
const server = require('../config/config').server;
const mlab = require('../config/config').mlab;
const mongo = require('mongodb').MongoClient;

const err404 = new Error('Not Found');
err404.status = 404;

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // we got a query?
  // yes display the data
  // no display just the form
  let source = req.query.url;

  const obj = {
    title: 'fCC-tiny',
    author: 'Christan Pujol',
    url: source,
  };
  if (source) {
    // get the tiny form
    source = encodeURI(source);
    source = source.replace(/\//g, '%2F');
    http.get(`${server.url}/tiny/${source}`, (r) => {
      let output = '';
      r.on('error', (err) => {
        obj.tiny = err;
      });
      r.on('data', (data) => {
        output += data;
        return output;
      });
      r.on('end', () => {
        output = JSON.parse(output);
        obj.tiny = `${server.url}/${output.tiny}`;
        res.render('index', obj);
      });
    });
  } else {
    res.render('index', obj);
  }
});

router.get('/:tiny', (req, res, next) => {
  const tiny = req.params.tiny;

  if (!shortid.isValid(tiny)) return next(err404);

  mongo.connect(mlab, (err, db) => {
    if (err) return next(err);
    const collection = db.collection('tiny');
    collection.findOne({ tiny }, (e, doc) => {
      if (e) return next(e);
      if (!doc) return next(err404);
      res.redirect(doc.url);
      db.close();
    });
  });
});


module.exports = router;
