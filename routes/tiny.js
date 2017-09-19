const express = require('express');
const shortid = require('shortid');
const mongo = require('mongodb').MongoClient;
const mlab = require('../config/config').mlab;
const isWebUri = require('valid-url').isWebUri;

const router = express.Router();


/* GET {url, tiny_url} */
router.get('/:url', (req, res, next) => {
  const urlOrigin = req.params.url;
  if (isWebUri(urlOrigin)) {
    mongo.connect(mlab, (err, db) => {
      if (err) return next(err);
      const collection = db.collection('tiny');
      collection.findAndModify(
        {
          url: { $eq: urlOrigin },
        },
        [['_id', 'asc']],
        {
          $setOnInsert: {
            url: urlOrigin,
            tiny: shortid.generate(),
          },
        }, {
          new: true,
          upsert: true,
        }, (e, docs) => {
          if (e) return next(e);
          res.send(docs.value);
          db.close();
        } // eslint-disable-line comma-dangle
      );
    });
  } else {
    res.send({ error: 'invalid URL' });
  }
});

module.exports = router;
