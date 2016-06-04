var exports = module.exports = {}
var joi = require('joi')
var admin = require(__base + 'app/models/adminModel')

var schema = joi.object().keys({
	username: joi.string().required().max(20),
	email: joi.string().email().required().max(30),
	password: joi.string().regex(/^[a-zA-Z0-9]{8,20}$/).min(6).max(10)
})

function response(res, status, data){
	if(status == 'error'){
		res.status(500).send({data: null, status: status, errorMsg: data})
	}else{
		res.status(200).send({data: data, status: status, errorMsg: null})
	}
}

module.exports = {
	register: function(req, res){
		joi.validate(req.body, schema, function(err){
			if(err){
				response(res, 'error', err.details[0].message)
			}else{
				admin.register(req, function(status, data){
					response(res, status, data)
				})
			}
		})
	}
}