var exports = module.exports = {}
var mongoose = require('mongoose')
var schema = mongoose.Schema

var Schema = new schema({
	API: {type: String},
	user: {},
	clientAddress: String,
	errorMessage: {},
	date: {type: Date, default: Date.now}
})

var model = mongoose.model('logs', Schema)


module.exports = {
	createLog: function(req, errMsg, cb){
		var log = new model({
			API				: req.url,
			user 			: (req.user) ? {name: req.user.username, id: req.user._id} : null,
			errorMessage 	: errMsg,
			clientAddress	: req.connection.remoteAddress,
		})
		log.save(function(err){
			if(err){
				return cb('error', {message: "Terjadi kesalahan"})
			}else{
				return cb('error', {message: "Terjadi kesalahan: "+log._id})
			}
		})
	}
}