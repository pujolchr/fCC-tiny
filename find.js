#! /usr/bin/env node

const url = 'mongodb://localhost:27018/db';

const mongo = require('mongodb').MongoClient;


mongo.connect(url, (err, db) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const col = db.collection('tiny');
  col.findAndUpdate().toArray((e, docs) => {
    console.log(docs);
    db.close();
  });
});
