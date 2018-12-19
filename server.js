var express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    flash = require('connect-flash')

mongoose.connect('mongodb://localhost:27017/HotelBooking', function(err, data) {
    console.log("Mongoose Connection Status " + mongoose.connection.readyState)
})

let schema = new mongoose.Schema({
	"id":Number
})

let hotels = mongoose.model('hotels',schema)

app.use(bodyparser.urlencoded({
  extended: true
}))

app.use(bodyparser.json());
app.use(bodyparser.raw())
app.use(bodyparser.text({ type: 'text/html' }))
app.use(flash())
app.set('view engine', 'ejs');
app.use(session({
    secret: 'codingisawesome'
}));

app.use(passport.initialize());
app.use(passport.session());

require('./app/config/passport')(passport);
require('./app/config/passport-google');
require('./app/routes.js')(app,hotels,passport);

app.use("/css", express.static(__dirname + "/client/css"))
app.use("/js", express.static(__dirname + "/client/js"))
app.use("/partials", express.static(__dirname + "/client/view/partials"))

app.listen(process.env.PORT || 3000)