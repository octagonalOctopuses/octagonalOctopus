var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');


var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var games = mongoose.Schema({
  token: {type: String, required: true},	
  playerRoles: String,
  results: String, 
  playerIds: String,
});

module.exports.Game = mongoose.model('Game', games);

module.exports.selectGame = function(token, callback) {
  Game.find({token}, (err, game) => {
  	console.log(game);
  	callback(game);
  });
};

module.exports.createGame = function(token, hostName, clientId, callback) {
	Game.create({token}, (err) => {
		if (err) {
			callback(err);
		} else {
			var playerRoles = {};
			playerRoles[hostName] = clientId;
			var playerIds = JSON.stringify(playerIds);
			var results = [];
			Game.update({token}, {playerIds, results}, (err) => {
				callback(err);
			});
		}
	});
};

module.exports.addPlayer = function(token, playerName, clientId, callback) {
	Game.find({token}, (err, game) => {
		var playerIds = JSON.parse(game.playerIds);
		playerIds[playerName] = clientId;
		playerIds = JSON.stringify(playerIds);
		Game.update({token}, {playerIds}, (err) => {
			callback(err);
		};
	});
};

module.exports.removePlayer = function(token, playerName, callback) {
	Game.find({token}, (err, game) => {
		var playerIds = JSON.parse(game.playerIds);
		delete playerIds[playerName];
		playerIds = JSON.stringify(playerIds);
		Game.update({token}, {playerIds}, (err) => {
			callback(err);
		};
	});
};

module.exports.addRoles = function(token, playerRoles, callback) {
	var playerRoles = JSON.stringify(playerRoles);
	Game.update({token}, {playerRoles}, (err) => {
		callback(err);
	});
};

module.exports.updateResults = function (roundResults, callback) {
	Game.find({token}, (err, game) => {
		var results = JSON.parse(game.results);
		results.push(roundResults);
		results = JSON.stringify(results);
		Game.update({token}, {results}, (err) => {
			callback(err);
		})
	});
};

// module.exports.getMerlin = function(token, callback) {
// 	Game.find({token}, (err, game) => {

// 	})
// }

// module.exports.getPlayerRoleMapping = function(token, callback) {
	
// }
