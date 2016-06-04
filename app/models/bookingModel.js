var exports = module.exports = {}
var mongoose = require('mongoose')
var schema = mongoose.Schema
var log = require('../library/log')

var Schema = schema({
	bookDate : {type:  Date, default: null},
	startTime : {type: String, default: null},
	endTime : {type: String, default: null},
	allDay : {type: String, default: null},
	title: {type: String, default: null},
	pay: {type: Number, default: null},
	field	: {type: Number, default: null},
	status: {type: String, default: 'reguler'}
})

var model = mongoose.model('booking', Schema, 'booking')

function findOne(req, id, cb){
	model.findOne({_id:id}, function(err, schedule){
		if(err){
			log.createLog(req, err, function(status, message){return cb(status, message)})
		}else{
			return cb('success', schedule)
		}
	})
}

function find(req, cb){
	model.find({}, function(err, docs){
		if(err){
			log.createLog(req, err, function(status, message){return cb(status, message)})
		}else{
			return cb('success', docs)
		}
	})
}

exports.findOne = findOne
exports.find = find

exports.createBooking = function(req, cb){
	req.body.bookDate = new Date()
	var dummy = new model(req.body)
	dummy.save(function(err){
		if(err){
			log.createLog(req, err, function(status, message){return cb(status, message)})
		}else{
			find(req, function(status, data){
				return cb(status, data)
			})
		}
	})
}
exports.updateBooking = function(req, cb){
	findOne(req, req.params.id, function(status, data){
		if(status == 'error'){
			log.createLog(req, err, function(status, message){return cb(status, message)})
		}else{
			for(p in req.body){
				data[p] = req.body[p]
			}
			data.save(function(err){
				if(err){
					log.createLog(req, err, function(status, message){return cb(status, message)})
				}else{
					find(req, function(status, data){
						return cb(status, data)
					})
				}
			})
		}
	})
}

exports.deleteBooking = function(req, cb){
	model.remove({_id: req.params.id}, function(err){
		if(err){
			log.createLog(req, err, function(status, message){return cb(status, message)})
		}else{
			find(req, function(status, data){
				return cb(status, data)
			})
		}
	})
}

exports.findBetweenDate = function(req, cb){
	console.log(req.body)
	model.find({
		bookDate: {
			$gte: new Date(req.body.start),
			$lt: new Date(req.body.end)
		}}).lean().exec(function(err, docs){

		if(err){
			log.createLog(req, err, function(status, message){return cb(status, message)})
		}else{
			return cb('success', docs)
		}
	})
}