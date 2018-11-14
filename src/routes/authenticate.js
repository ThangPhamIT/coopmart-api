var express = require('express');
var User = require('../models/User');

const router = express.Router();

router.post('/', (req, res) => {
    const { credentials } = req.body;
    console.log('User login: ', credentials);
    User.findOne({ username: credentials.username.toUpperCase(), department: credentials.department.toUpperCase() }).then(user => {
        if (user) {
            res.json({ user: user.toAuthJSON() });
        } else {
            res.status(400).json({
                errors: {
                    global: "Họ và tên chưa được đăng ký"
                }
            });
        }
    });
});

module.exports = router;