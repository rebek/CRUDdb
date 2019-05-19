require('./models/employee.model');
const express = require('express');
// const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const employeeController = require('./controllers/employeeController');
const mongo_uri = 'mongodb+srv://rbkcellos:Reb35399-@cluster0-5zvdy.mongodb.net/EmployeeDB?retryWrites=true';


 MongoClient.connect(mongo_uri, { useNewUrlParser: true})
 .then(client => {
   const db = client.db('EmployeeDB');
   const collection = db.collection('employee');
   app.locals.collection = collection;
   console.log("Connected to `" + collection + "`!");
 }).catch(error => console.error(error));


var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
  const collection = req.app.locals.collection;
  collection.find({}).toArray().then(response => res.status(200).json(response)).catch(error => console.error(error));
});


app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.use("/public", express.static(path.join(__dirname, 'public')));


var port  = process.env.PORT || 9001; //app.set('port', process.env.PORT || 3000);

app.listen(port);
console.log(port);

app.use('/employee', employeeController);
