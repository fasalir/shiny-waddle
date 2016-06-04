var adminM 	= require(__base + 'app/models/adminModel');

var adminModel = adminM.modelExports();

var express = require('express');
var app = express();


var bcrypt = require('bcryptjs');
var	salt = bcrypt.genSaltSync(10);

var jwt = require('jsonwebtoken');

var exports = module.exports = {};
var lib 		= require(__base + 'app/library/lib');
var errMsg 		= lib.errMsg();
var async = require('async');


exports.adminMiddleware = function(req, res, next){
	var token = req.body.token || req.headers['access-token'];
	// if(blacklist == token){
	// 	res.status(401).send({'data': null, token: null, status: 'error', errMsg: errMsg.message[127]});
	// }else{
		if (token) {
			// verifies secret and checks exp
			jwt.verify(token, 'superSecret', function(err, decoded) {      
				if (err) {
					res.status(401).send({'data': null, token: null, status: 'error', errMsg: errMsg.message[125]});
				} else {
					adminModel.findOne({_id: decoded.id}, ('-password'), function(err, docs){
						
						if(err){
							res.status(401).send({'data': null, token: null, status: 'error', errMsg: err});
						}else{
							if(docs == null){
								res.status(401).send({'data': null, token: null, status: 'error', errMsg: errMsg.message[124]});
							}else{
								// if everything is good, save to request for use in other routes
								req.user = docs;
								next();
							}
						}
					})
				}
			})
		} else {
			res.status(401).send({'data': null, token: null, status: 'error', errMsg: errMsg.message[126]});
		}
	// }
}

exports.authenticateAdmin = function(req, res){
	console.log(req.body)
	adminModel.findOne({'username': req.body.username}).exec(function(err, admin){
		console.log(admin)
		if (err){
			res.status(401).send({'data': errMsg.data, status: errMsg.status, errMsg: err});
		}else{
			if (admin == null){
				res.status(401).send({'data': errMsg.data, status: errMsg.status, errMsg: errMsg.message[101]});
			}else{
				bcrypt.compare(req.body.password, admin.password, function(err, result) {
				    if (err){
				    	res.status(401).send({'data': errMsg.data, status: errMsg.status, errMsg: err});
				    }else{
				    	if (!result){
				    		console.log("gagal kompare")
				    		res.status(401).send({'data': errMsg.data, status: errMsg.status, errMsg: errMsg.message[101]});
				    	}else{
				    		
				    		admin = {
				    			id: admin._id,
				    			userName: admin.username
				    		}
				    		var token = jwt.sign(admin, 'superSecret', {
					        	expiresIn: 90000 // expires in 30 minutes
					        });
				    		res.status(200).send({'data': admin, token: token, status: 'success', errMsg: null});
				    	}
				    }
				})
			}
		}
	})
}