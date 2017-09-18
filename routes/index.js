'use strict';

const express = require('express');
const http = require('http');
const server = require('../config/config').server;
const mlab = require('../config/config').mlab;
const mongo = require('mongodb').MongoClient;

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
    http.get(`${server.url}:${server.port}/tiny/${source}`, (r) => {
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
        obj.tiny = `${server.url}:${server.port}/${output.tiny}`;
        res.render('index', obj);
      });
    });
  } else {
    res.render('index', obj);
  }
});

router.get('/:tiny', (req, res) => {
  const tiny = req.params.tiny;

  mongo.connect(mlab,  (err, db) => {
    const collection = db.collection('tiny');
    collection.findOne({ tiny }, (e, doc) => {
      res.redirect(doc.url);
      db.close();
    });
  });
});


module.exports = router;
