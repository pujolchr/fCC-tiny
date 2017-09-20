const express = require('express');
const shortid = require('shortid');
const mongo = require('mongodb').MongoClient;
const cfg = require('../config/config');
const isWebUri = require('valid-url').isWebUri;

const router = express.Router();


/* GET {url, tiny_url} */
router.get('/:url', (req, res, next) => {
  const urlOrigin = req.params.url;
  if (isWebUri(urlOrigin)) {
    mongo.connect(cfg.mlab, (err, db) => {
      if (err) return next(err);
      const collection = db.collection(cfg.collection);
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
          const output = docs.value;
          output.tiny = `${cfg.server}/${docs.value.tiny}`;
          res.send(output);
          db.close();
        } // eslint-disable-line comma-dangle
      );
    });
  } else {
    res.send({ error: 'Unable to find URL to redirect to.' });
  }
});

module.exports = router;
