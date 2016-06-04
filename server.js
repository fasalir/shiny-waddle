global.__base = __dirname + '/';
var express = require('express'),
	app 	= express(),
	http 	= require('http').Server(app),
	// io = require('socket.io')(http),
	db 		= require('./config/database').dbase(),
	mongoURI = 'mongodb://'+db.user+':'+db.pass+'@'+db.host+':'+db.port+'/'+db.dbname,
	dbDriver = require(db.driver),
	router 	= express.Router(),
	rest 	= require('./app/routes'),
	bodyParser = require('body-parser'),
	morgan 	= require('morgan'),
	routes 	= require('./public'),
	path 	= require ('path');
const exec = require('child_process').exec;
var command = 'cd\/ | cd sisfo | start mongoserver.bat'
exec(command, function (error, stdout, stderr) {
	if(error){
		console.log(error)
	}else{
		dbDriver.connect(mongoURI, function(err, db){
			if (err) {
				console.log(err);
			}else{
				var attachDB = function(req, res, next){
					req.db = db;
					next();
				};
				// call routes
				app.use('/scripts', express.static(__dirname + '/node_modules/'));
				app.use(express.static(__dirname + '/public'));
				// app.use(express.static(path.join(__dirname + '.../public')));
				app.use(morgan('dev'));
				app.use(bodyParser.json()); // parse application/json
			    app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
			    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

				app.use('/api', router);
				// app.get('*', routes.index);
				var restAPI = new rest(router);

				const port = 70;
				http.listen(port, function(){
					console.log('listening on port', port);
				});
			}
		});
	}
});
