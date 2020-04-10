'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'pantip';
// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true })

// Constants
const PORT = 8080;

// App
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))


const schema = {
  "stage": 1,
  "question": ["_", "_", "_", "_"],
  "guessing": ["*", "*", "*", "*"],
  "answer": [],
  "score": {
    score: 0,
    duration_secs: 0,
    duration_text: ""
  },
  "fail": 0,
  "step": 0,
  "gameStart": null,
  "gameEnd": null
}

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const col = db.collection('game');

  // get index html template
  app.get('/', (req, res) => {
    // Get first two documents that match the query
    col.find({}).limit(1).toArray(function(err, docs) {
      assert.equal(null, err);
      // res.send(JSON.stringify(docs));
      res.render('index');
      client.close();
    });
  });
  //receive data when users hit the button
  app.post('/', function(req, res) {
    console.log(req.body.name);
    res.render('index');
  })
});

app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);