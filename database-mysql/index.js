const Sequelize = require('sequelize');

const numPeopleOnMission = {
  5: [2,3,2,3,3],
  6: [2,3,4,3,4],
  7: [2,3,3,4,4],
  8: [3,4,4,5,5],
  9: [3,4,4,5,5],
  10: [3,4,4,5,5]
}

const sequelize = new Sequelize('Avalon', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  },
  socketid: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  host: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  votes: {
    type: Sequelize.STRING,
    defaultValue: '[null, null, null, null, null]' // implement if time
  }
});

const Game = sequelize.define('game', {
  gameToken: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  results: {
    type: Sequelize.STRING,
    defaultValue: '[]'
  },
  votes: {
    type: Sequelize.STRING,
    defaultValue: '[]'
  },
  missionNumber: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  votesNeeded: {
    type: Sequelize.STRING,
  },
  numParticipants: {
    type: Sequelize.INTEGER,
  }
})

const Relation = User.belongsTo(Game, {foreignKey: 'gameKey'});

sequelize.sync();

module.exports.getResults = function(gameToken, callback) {
  Game.findOne({where: {gameToken}})
  .then((game) => {
    callback(JSON.parse(game.dataValues.results));
  })
};

module.exports.addVote = function(gameToken, vote, callback) {
  Game.findOne({where: {gameToken}})
  .then((game) => {
    var votesArray = JSON.parse(game.dataValues.votes);
    votesArray.push(vote);
    votes = JSON.stringify(votesArray);
    game.update({votes});
    callback(votesArray);
  });
};

module.exports.votingInfo = function(gameToken, callback) {
  Game.findOne({where: {gameToken}})
  .then((game) => {
    callback(game.dataValues.numParticipants, game.dataValues.missionNumber);
  })
}

module.exports.voteNeeded = function(gameToken, callback) {
  Game.findOne({where: {gameToken}})
  .then((game) => {
    callback(JSON.parse(game.dataValues.votesNeeded)[games.dataValues.missionNumber]);
  });
};

module.exports.createGame = function(token, callback){
  Game.create({
    gameToken: token
  })
  .then(callback);
};

module.exports.votesNeeded = function(gameToken, callback) {
  Game.findOne({where: {gameToken}})
  .then((game) => {
    callback(game.dataValues.votesNeeded[game.dataValues.missionNumber])
  })
}

module.exports.nextMission = function(gameToken, callback) {
  Game.findOne({where: {gameToken}})
  .then((game) => {
    var missionNumber = game.dataValues.missionNumber + 1;
    game.update({missionNumber});
  })
  .then(callback);
}

module.exports.addPlayer = function(token, host, name, socketid, callback) {
  User.create({
    username: name, 
    socketid: socketid,
    host: host,
    gameKey: token,
  })
  .then(callback);
};

module.exports.removePlayer = function(socketid, callback) {
  User.findOne({where: {socketid}})
  .then((user) => {
    var gameToken = user.dataValues.gameKey;
    user.destroy();
    callback(gameToken);
  });
};

module.exports.getAllPlayers = function(gameKey, callback) {
  User.findAll({
    where: {gameKey}
  })
  .then((users) => {
    callback(users);
  });
};

module.exports.updateVotesAndParticipantNum = function(gameToken, callback) {
  module.exports.getAllPlayers(gameToken, (users) => {
    var votesNeeded = JSON.stringify(numPeopleOnMission[users.length]);
    Game.findOne({where: {gameToken}})
    .then((game) => {
      game.update({numParticipants: users.length})
      game.update({votesNeeded});
    })
    .then(callback);
  });
};

module.exports.getAllUsernames = function(gameKey, callback) {
  module.exports.getAllPlayers(gameKey, (users) => {
    callback(users.map((element) => {
      return element.dataValues.username;
    }));
  });
};

module.exports.getAllSocketIds = function(gameKey, callback) {
  module.exports.getAllPlayers(gameKey, (users) => {
    callback(users.map((element) => {
      return element.dataValues.socketid;
    }));
  });
};

module.exports.getSocketId = function(username, callback) {
  User.findOne({where: {username}})
  .then((user) => {
    callback(user.dataValues.socketid);
  })
}

module.exports.updateResults = function(gameToken, roundResults, callback) {
  Game.findOne({where: {gameToken}})
  .then((game) => {
    var results = JSON.parse(game.dataValues.results);
    results.push(roundResults);
    results = JSON.stringify(results);
    game.update({results});
  })
};

module.exports.assignRole = function(username, role, callback) {
  User.findOne({
    where: {username}
  })
  .then((user) => {
    user.update({role})
  })
  .then(callback);
};

module.exports.getMerlin = function(gameKey, callback) {
  module.exports.getAllPlayers(gameKey, (users) => {
    for (var i = 0; i < users.length; i++) {
      if (users[i].dataValues.role === 'Merlin') {
        callback(users[i].dataValues); // .socketid
      }
    }
  })
};

module.exports.getHost = function(gameKey, callback) {
  module.exports.getAllPlayers(gameKey, (users) => {
    for (var i = 0; i < users.length; i++) {
      if (users[i].dataValues.host) {
        callback(users[i].dataValues); // .socketid
      }
    }
  });
};

module.exports.getMordred = function(gameKey, callback) {
  module.exports.getAllPlayers(gameKey, (users) => {
    for (var i = 0; i < users.length; i++) {
      if (users[i].dataValues.role === 'Mordred') {
        callback(users[i].dataValues); // .socketid
      }
    }
  });
}

