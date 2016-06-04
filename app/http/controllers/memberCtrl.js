var exports = module.exports = {}
var member = require(__base + 'app/models/memberModel')
var joi = require('joi')

var schema = joi.object().keys({
	nama : joi.string().required(),
	alamat : joi.string().required(),
	booking : joi.array().required(),
	telepon : joi.number().required(),
	detail: joi.object().optional(),
	status: joi.string().optional()
})

function response(res, status, data){
	if(status == 'error'){
		res.status(500).send({data: null, status: status, errorMsg: data})
	}else{
		res.status(200).send({data: data, status: status, errorMsg: null})
	}
}

exports.saveMember = function(req, res){
	joi.validate(req.body, schema,function(err){
		if(err){
			response(res, 'error', err.details[0].message)
		}else{
			if(req.params.id){
				member.updateMember(req, function(status, data){
					response(res, status, data)
				})
			}else{
				member.saveMember(req, function(status, data){
					response(res, status, data)
				})
			}
		}
	})
}

exports.findMembers = function(req, res){
	member.findMembers(req,  function(status, data){
		response(res, status, data)
	})
}

exports.deleteMember = function(req, res){
	member.deleteMember(req, function(status, data){
		response(res, status, data)
	})
}