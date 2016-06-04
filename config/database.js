var exports = module.exports = {};
exports.dbase = function(){
	return dbConfig = {
		user 	: 'admin',
		pass 	: 'Password1',
	    host 	: '127.0.0.1',
	    port 	: '27017',
	    dbname 	: 'sisfo',
	    driver 	: 'mongoose'
	};	
}
