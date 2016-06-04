var exports = module.exports = {}
var booking = require(__base + 'app/models/bookingModel')
var joi = require('joi')

var schema = joi.object().keys({
	startTime : joi.string().optional(),
	endTime : joi.string().optional(),
	allDay : joi.string().optional(),
	title: joi.string().required(),
	pay: joi.number().required(),
	field: joi.number().required(),
	_id: joi.string().optional()
})

function response(res, status, data){
	if(status == 'error'){
		res.status(500).send({data: null, status: status, errorMsg: data})
	}else{
		res.status(200).send({data: data, status: status, errorMsg: null})
	}
}

exports.createBooking = function(req, res){
	joi.validate(req.body, schema, function(err){
		if(err){
			response(res, 'error', err.details[0].message)
		}else{
			if(req.params.id){
				booking.updateBooking(req, function(status, data){
					response(res, status, data)
				})
			}else{
				booking.createBooking(req, function(status, data){
					response(res, status, data)
				})
			}
		}
	})
}

exports.findBooking = function(req, res){
	if(req.params.id){
		booking.findOne(req, req.params.id, function(status, data){
			response(res, status, data)
		})
	}else{
		booking.find(req, function(status, data){
			response(res, status, data)
		})
	}
}

exports.deleteBooking = function(req, res){
	booking.deleteBooking(req, function(status, data){
		response(res, status, data)
	})
}

exports.findBetweenDate = function(req, res){
	booking.findBetweenDate(req, function(status, data){
		response(res, status, data)
	})
}