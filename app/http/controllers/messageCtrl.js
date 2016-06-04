var exports = module.exports = {}
var message = require(__base + 'app/models/messageModel')
var joi = require('joi')

var schema = joi.object().keys({
	name 	: joi.string().required(),
	email 	: joi.string().email().required(),
	phone 	: joi.number().optional(),
	subject : joi.string().required(),
	message	: joi.string().required()
})

function response(res, status, data){
	if(status == 'error'){
		res.status(500).send({data: null, status: status, errorMsg: data})
	}else{
		res.status(200).send({data: data, status: status, errorMsg: null})
	}
}

exports.storeMessage = function(req, res){
	joi.validate(req.body, schema,function(err){
		if(err){
			response(res, 'error', err.details[0].message)
		}else{
			message.storeMessage(req, function(status, data){
				response(res, status, data)
			})
		}
	})
}

exports.findMessages = function(req, res){
	message.findMessages(req, function(status, data){
		response(res, status, data)
	})
}