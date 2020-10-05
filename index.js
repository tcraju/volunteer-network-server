const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const ObjectId = require ('mongodb').ObjectID; 

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 5000


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ogiy1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const taskCollection = client.db("volunteer-network-db").collection("taskdb");
  const allJobCategory= client.db("volunteer-network-db").collection("allJob-db");
  console.log('database connected');

  app.post('/addTask', (req, res) => {
    const task = req.body;
    taskCollection.insertOne(task)
      .then(result => { 
        // res.send (result.insertedCount) 
      })
  })

  app.post('/addJobCategory', (req, res) => {
    const job = req.body;
    allJobCategory.insertOne(job)
      .then(result => { 
        // res.send (result.insertedCount) 
      })
  })

  app.get('/jobCategory', (req, res) => {
    allJobCategory.find({})
    .toArray( (err, documents) => {
      res.send (documents);
    })
  })


  app.get('/registeredJob', (req, res) => {
    taskCollection.find({})
    .toArray( (err, documents) => {
      res.send (documents);
    })
  })

  app.delete ('/deleteItem/:id', (req, res) => {
    console.log(req.params.id);
    taskCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then (( result) => {
      console.log(result);
    })
  })


});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)