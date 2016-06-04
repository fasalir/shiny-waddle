var booking = require('../app/http/controllers/bookingCtrl')
var member = require('../app/http/controllers/memberCtrl')
var admin = require('../app/http/controllers/adminCtrl')
var message = require('../app/http/controllers/messageCtrl')
var express = require('express');

var	middleware = require(__base + 'app/http/middleware/authenticate');

var path = require('path');

module.exports = function(app){
	// ADMIN
	var adminMiddleware = middleware.adminMiddleware;
	// app.get('/admin-panel', function(req, res){
		// console.log(path.join(__base + 'public/admin'))
	 //    app.use(express.static(path.join(__base + 'public')));
	 //    res.sendFile(path.join(__base + 'public/login.html'));
	// });
	
	app.get('/dashboard', function(req, res){
		// console.log(path.join(__base + 'public/admin'))
	    app.use(express.static(path.join(__base + 'public/admin')));
	    res.sendFile(path.join(__base + 'public/admin/index.html'));
	})
	app.post('/register', admin.register)
	app.get('/booking/find/:id?', booking.findBooking)
	app.get('/adm-panel/booking/find/:id?', booking.findBooking)
	app.post('/booking/create/:id?', booking.createBooking)
	app.get('/booking/delete/:id', booking.deleteBooking)

	app.post('/member/store/:id?', member.saveMember)
	app.get('/member/find/:id?', member.findMembers)
	app.get('/member/delete/:id?', member.deleteMember)

	app.post('/message/post', message.storeMessage)
	app.get('/message/list', message.findMessages)

	app.post('/report', booking.findBetweenDate)

	app.post ('/login', middleware.authenticateAdmin)
}