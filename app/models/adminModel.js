var exports = module.exports = {}

var mongoose = require('mongoose'),
	  Schema = mongoose.Schema,
	  async = require('async');

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var log = "errorLogs";

var schema = new Schema({
	username: {type: String, default: ''},
	password: {type: String, default: ''},
	email: {type: String, default: ''},
	status: {type: String, default: ''},
	lastUpdated: {type: Date, default: Date.now}
})

var model = mongoose.model('admin', schema, 'admin');

exports.modelExports = function(){
	return model
}

function find(req, res, cb){
	model.find({}, ('-password'), function(err, docs){
		if(err){
			return cb('error', err)
		}else{
			return cb('success', docs)
		}
	})
}

exports.findOneAdmin = function(req, id, cb){
	model.findOne({_id: id}, ('-password'), function(err, doc){
		if(err){
			log.createLog(req, err, function(status, message){return cb(status, message)})
		}else{
			return cb('success', doc)
		}
	})
}

exports.register = function(req, cb){
	var hashPassword = bcrypt.hashSync(req.body.password, salt);
	req.body.password = hashPassword;
	
	var input = new model(req.body);
	input.save(function(err){
		if (err){
			return cb('error', err)
		}else{
			model.findOne({_id: input._id}, ('-password'), function(err, docs){
				console.log(err)
				if (err){
					return cb('error', err)
				}else{
					return cb('success', docs);
				}
			})
		}
	})

	// var input = new model(req.body);
	// input.save(function(err){
	// 	if(err){
	// 		return cb('error', err)
	// 	}else{
	// 		findOne(req, input._id, function(status, data){
	// 			return cb(status, data)
	// 		})
	// 	}
	// })
}
