const Sequelize = require('sequelize');


const sequelize = new Sequelize('Avalon', 'root', 'plantlife', {
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
  }
})

// sequelize.sync();


const Relation = User.belongsTo(Game, {foreignKey: 'gameKey'});


module.exports.createGame = function(token, callback){
  Game.create({
    gameToken: token
  })
  .then(callback);
};


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
  User.destroy({
    where: {socketid}
  })
.then(callback);
};

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

};

module.exports.getAllSocketIds = function(gameToken, callback) {

};

module.exports.getMerlin = function(gameKey, callback) {
  User.findAll({
    where: {gameKey}
  })
  .then((users) => {
    for (var i = 0; i < users.length; i++) {
      if (users[i].dataValues.role = 'Merlin') {
        return users[i].dataValues;
      }
    }
  })
  .then((merlin) => {
    callback(merlin);
  })
};

module.exports.addPlayer('1234', true, 'player1', 'aaaa', () => {
  module.exports.getMerlin('1234');
})






