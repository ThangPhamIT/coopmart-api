var express = require('express');
var User = require('../models/User');
var parseErrors = require('../utils/parseErrors');
var sendEmailSubmitTest = require('../mailer');

const router = express.Router();

router.post('/', (req, res) => {
    const { user } = req.body;
    console.log('User sign up: ', user);
    let username = user.username;
    let department = user. department;
    const _user = new User({ username, department });
    _user.setUsernameHash(username);
    _user.save()
        .then(userRecord => {
            res.json({ user: userRecord.toAuthJSON() })
        })
        .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post('/submitTest', (req, res) => {
    const { test } = req.body;
    console.log('User submit test: ', test);
    User.findOneAndUpdate(
        { username: test.username },
        { $set: { submitTest: true, test: test.testing }},
        {new: true},
        (err, doc) => {
            if (err) {
                res.status(400).json({ errors: parseErrors(err.errors) });
            }
            sendEmailSubmitTest(test);
            res.status(200).json({ user: doc });
        }
    )
});

module.exports = router;