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

Game = mongoose.model('Game', games);

module.exports.selectGame = function(token, callback) {
  Game.find({token}, (err, game) => {
  	callback(game[0]); //game object with token, results, playerIdMapping, playerRolesMapping etc.
  });
};

module.exports.createGame = function(token, hostName, clientId, callback) {
	Game.create({token}, (err) => {
		if (err) {
			callback(err);
		} else {
			var playerIds = {};
			playerIds[hostName] = clientId;
			playerIds = JSON.stringify(playerIds);
			var results = [];
			results = JSON.stringify(results);
			Game.update({token}, {playerIds, results}, (err) => {
				callback(err);
			});
		}
	});
};

module.exports.addPlayer = function(token, playerName, clientId, callback) {
	Game.find({token}, (err, game) => {
		var playerIds = JSON.parse(game[0].playerIds);
		playerIds[playerName] = clientId;
		playerIds = JSON.stringify(playerIds);
		Game.update({token}, {playerIds}, (err) => {
			callback(err);
		});
	});
};

module.exports.removePlayer = function(token, playerName, callback) {
	Game.find({token}, (err, game) => {
		var playerIds = JSON.parse(game[0].playerIds);
		delete playerIds[playerName];
		playerIds = JSON.stringify(playerIds);
		Game.update({token}, {playerIds}, (err) => {
			callback(err);
		});
	});
};

module.exports.addRoles = function(token, playerRoles, callback) {
	var playerRoles = JSON.stringify(playerRoles); 
	Game.update({token}, {playerRoles}, (err) => {
		callback(err);
	});
};

module.exports.updateResults = function (token, roundResults, callback) {
	Game.find({token}, (err, game) => {
		console.log('got here')
		var results = JSON.parse(game[0].results);
		results.push(roundResults);
		results = JSON.stringify(results);
		Game.update({token}, {results}, (err) => {
			callback(err);
		})
	});
};

module.exports.removeAllGames = function(callback) {
	Game.remove({}, callback);
};

module.exports.getPlayerRoleMapping = function(token, callback) {
	Game.find({token}, (err, game) => {
		var playerRoles = JSON.parse(game[0].playerRoles);
		callback(playerRoles); //object with key as username and value as role
	})
}

module.exports.getPlayerIdMapping = function(token, callback) {
	Game.find({token}, (err, game) => {
		var playerId = JSON.parse(game[0].playerIds);
		callback(playerId); //object with key as username and value as playerId
	})
}


module.exports.getMerlin = function(token, callback) {
	module.exports.getPlayerRoleMapping(token, (playerRoles) => {
		for (var prop in playerRoles) {
			if (playerRoles[prop] === 'Merlin') {
				callback(prop); // returns callback with Merlin's username as argument
			}
		}
	})
}














