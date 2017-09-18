#! /usr/bin/env node

'use strict'

const url = 'mongodb://localhost:27018/db';

const mongo = require('mongodb').MongoClient;

const firstName = process.argv[2];
const lastName = process.argv[3];
const collection = 'tiny'

const docu = {};
docu.url = 'https://naga.no';
docu.tiny = 'test/uiyiy';
mongo.connect(url, (err, db) => {
  if (err) throw err;

  let col = db.collection(collection);

  col.insert(docu, (err, data) => {
    if (err) throw err;
    console.log(JSON.stringify(docu));
    db.close();
  });
})
