const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://sully:demo@cluster0-4vmbd.mongodb.net/test?retryWrites=true";
const dbName = "demo";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  var date
  if ('date' in req.query) {
    date = req.query.date
    date = date
  } else {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    date = yyyy + '-' + dd + '-' + mm;
  }
  console.log(date);
  db.collection('entries').find({date:date}).toArray((err, messages) => {
      console.log(messages)
      res.render('index.ejs', {messages: messages})
    })
})

app.post('/messages', (req, res) => {
  console.log(req.body)
  db.collection('entries').save({msg: req.body.msg, date: req.body.date}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


app.delete('/messages', (req, res) => {
  db.collection('entries').findOneAndDelete({msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
