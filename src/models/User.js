var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    usernameHash: {
        type: String,
        required: false
    },
    submitTest: {
        type: Boolean,
        default: false
    },
    test: {
        type: Array,
        required: false
    },
}, { timestamps: true });

schema.methods.isValidUsernameHash = function isValidUsernameHash(username) {
    return bcrypt.compareSync(username, this.usernameHash);
};

schema.methods.setUsernameHash = function setUsernameHash(username) {
    this.usernameHash = bcrypt.hashSync(username, 10);
};

schema.methods.getUsernameHash = function getUsernameHash(username) {
    return bcrypt.hashSync(username, 10);
};

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign({
        usernameHash: this.usernameHash
    }, process.env.JWT_SECRET);
};

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        username: this.username,
        department: this.department,
        submitTest: this.submitTest,
        token: this.generateJWT(),
    }
};

schema.methods.toSubmitTest = function toSubmitTest() {
    return {
        username: this.username,
        department: this.department,
        submitTest: true,
        token: this.generateJWT()
    }
};

schema.plugin(uniqueValidator, { message: "This user is already registered." });

module.exports = mongoose.model('User', schema);