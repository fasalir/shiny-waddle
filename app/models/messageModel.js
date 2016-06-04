var exports = module.exports = {}
var mongoose = require('mongoose')
var schema = mongoose.Schema
var log = require('../library/log')

var Schema = schema({
	name 	: {type: String, default: null},
	email 	: {type: String, default: null},
	phone 	: {type: String, default: null},
	subject : {type: String, default: null},
	message	: {type: String, default: null},
	lastUpdated	: {type:  Date, default: Date.now}
})

var model = mongoose.model('messages', Schema, 'messages')

exports.storeMessage = function(req, cb){
	var input = new model(req.body)
	input.save(function(err){
		if(err){
			log.createLog(req, err, function(status, message){return cb(status, message)})
		}else{
			return cb('success', null)
		}
	})
}

exports.findMessages = function(req, cb){
	model.find({}, function(err, docs){
		if(err){
			log.createLog(req, err, function(status, message){return cb(status, message)})
		}else{
			return cb('success', docs)
		}
	})
}