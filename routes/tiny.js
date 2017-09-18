const express = require('express');
const shortid = require('shortid');
const mongo = require('mongodb').MongoClient;
const cfg = require('../config/config').db;
const mlab = require('../config/config').mlab;

const router = express.Router();


/* GET {url, tiny_url} */
router.get('/:url', (req, res) => {
  // check if id is a valid url

  const url = mlab;
  mongo.connect(url, (err, db) => {
    const collection = db.collection('tiny');
    collection.findAndModify(
      {
        url: req.params.url,
      },
      [['_id', 'asc']],
      {
        $setOnInsert: {
          url: req.params.url,
          tiny: shortid.generate(),
        },
      }, {
        new: true,
        upsert: true,
      }, (e, docs) => {
        if (e) {
          res.send(e);
          db.close();
        } else {
          res.send(docs.value);
          db.close();
        }
      } // eslint-disable-line comma-dangle
    );
  });
});

module.exports = router;
