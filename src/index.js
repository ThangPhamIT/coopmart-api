var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var Promise = require('bluebird');

var authenticate = require('./routes/authenticate');
var users = require('./routes/users');

dotenv.config();

const app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false });

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.all('/*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin: *');
    res.setHeader('Access-Control-Allow-Credentials: true');
    res.setHeader('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers: accept, content-type, x-xsrf-token, x-csrf-token, authorization');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.get('/*', (req, res) => {
    res.render(path.join(__dirname, 'index'));
});


app.use("/api/authenticate", authenticate);
app.use("/api/users", users);
app.use("/api/users/submitTest", users);

app.listen(port, () => console.log('Running on port:' + port)
);