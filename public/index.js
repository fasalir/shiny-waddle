path = require ('path');
exports.index = function(req, res){
	res.sendFile(__dirname+'/index.html');
};