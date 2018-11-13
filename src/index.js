var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var Promise = require('bluebird');
var cors = require('cors');

var authenticate = require('./routes/authenticate');
var users = require('./routes/users');

dotenv.config();

const app = express();
app.use(cors());
var port = process.env.PORT || 5000;

app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false });

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/*', (req, res) => {
    res.render(path.join(__dirname, 'index'));
});


app.use("/api/authenticate", authenticate);
app.use("/api/users", users);
app.use("/api/users/submitTest", users);

app.listen(port, () => console.log('Running on port:' + port)
);