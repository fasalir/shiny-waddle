var exports = module.exports = {}
var mongoose = require('mongoose')
var schema = mongoose.Schema
var log = require('../library/log')

var Schema = schema({
	nama : {type: String, default: null},
	alamat : {type: String, default: null},
	booking : [
		{
			_id: false,
			startTime : {type: String, default: null},
			endTime : {type: String, default: null}
		}
	],
	telepon : {type: Number, default: null},
	detail: {},
	lastUpdated	: {type:  Date, default: Date.now},
	status: {type: String, default: null}
	// date: {type: String, default: null}
})

var model = mongoose.model('member', Schema, 'member')

function findMembers(req, cb){
	model.find({}, function(err, docs){
		if(err){
			log.createLog(req, err, function(status, message){return cb(status, message)})
		}else{
			return cb('success', docs)
		}
	})
}

exports.findMembers = findMembers

exports.saveMember = function(req, cb){
	var input = new model(req.body)
	input.save(function(err){
		if(err){
			log.createLog(req, err, function(status, message){return cb(status, message)})
		}else{
			findMembers(req, function(status, data){
				return cb(status, data)
			})
		}
	})
}

exports.updateMember = function(req, cb){
	model.update({_id: req.params.id}, {
			$set:{
				nama: req.body.nama,
				alamat: req.body.alamat,
				booking: req.body.booking,
				telepon: req.body.telepon
			}
		}, function(err){
			if(err){
				log.createLog(req, err, function(status, message){return cb(status, message)})
			}else{
				findMembers(req, function(status, data){
					return cb(status, data)
				})
			}
		}
	)
}

exports.deleteMember = function(req, cb){
	model.remove({_id: req.params.id}, function(err){
		if(err){
			log.createLog(req, err, function(status, message){return cb(status, message)})
		}else{
			findMembers(req, function(status, data){
				return cb(status, data)
			})
		}
	})
}