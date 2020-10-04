const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 5000

// console.log(process.env.DB_USER);
// const pass=ZWeEPuoS31slfKd3
// const user = volunteer-network-admin





// const uri = "mongodb+srv://volunteer-network-admin:ZWeEPuoS31slfKd3@cluster0.ogiy1.mongodb.net/volunteer-network-db?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("volunteer-network-db").collection("task-db");
//   // perform actions on the collection object
//   client.close();
// });








// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w5x7b.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const uri = "mongodb+srv://volunteer-network-admin:ZWeEPuoS31slfKd3@cluster0.ogiy1.mongodb.net/volunteer-network-db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const taskCollection = client.db("volunteer-network-db").collection("taskdb");
  console.log('database connected');

  app.post('/addTask', (req, res) => {
    const task = req.body;
    console.log(taskCollection);
    taskCollection.insertOne(task)
      .then(result => { 
        // console.log(result.insertedCount);
        // res.sendStatus(result.insertedCount)
        // res.send (result.insertedCount) 
      })
  })

//   app.get('/products', (req, res) => {
//     // productCollection.find({}).limit(20)
//     productCollection.find({})
//     .toArray( (err, documents) => {
//       res.send (documents);
//     })
//   })

//   app.get('/products/:key', (req, res) => {
//     // productCollection.find({}).limit(20)
//     productCollection.find({key: req.params.key})
//     .toArray( (err, documents) => {
//       res.send (documents[0]);
//     })
//   })

//   app.post ('/productsByKeys', (req, res)=>{
//     const productKeys = req.body;
//     productCollection.find ({key: {$in: productKeys}})
//     .toArray((err, documents)=> {
//       res.send (documents)
//     })
//   })

  // perform actions on the collection object
  // client.close();
});







// const password=AJgExZkR6nQU7up;
// const user = emaJhon;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)