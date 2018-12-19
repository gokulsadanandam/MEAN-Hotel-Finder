var mongoose = require('mongoose')

const schema = new mongoose.Schema({
	'userID':String,
	"firstname":String,
	"lastname":String
})

const user = mongoose.model('googleusers',schema)


module.exports =  user 