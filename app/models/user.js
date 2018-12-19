var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs');

var userschema = new mongoose.Schema({
    "firstname": String,
    "lastname": String,
    "email": String,
    "password": String,
    "contact":String
})



userschema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userschema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("users", userschema)