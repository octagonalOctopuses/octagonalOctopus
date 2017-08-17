var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');

var helpers = require('./helper-functions');
var database = require('../database-mongo');
io.on('connection', (socket) => {

  socket.on('join', (data) => {
    socket.join(data.roomname);
    database.createPlayer(data.roomname, socket.id, () => {
      database.addPlayer(data.roomname, data.username, socket.id, () => {
        database.getPlayerIdMapping(data.roomname, (playerId) => {
          var players = [];
          for (var prop in playerId) {
            players.push(prop);
          }
          io.in(data.roomname).emit('updateState', {players});
        });
      });
    });
  });

  socket.on('create', (data) => {
    var accessCode = '0c927' //helpers.generateToken();
    socket.join(accessCode);
    var pageID = 'GameOwnerWaitingForPlayersScreen'
    database.createPlayer(accessCode, socket.id, () => {
      database.createGame(accessCode, data.username, socket.id, () => {
        socket.emit('updateState', {accessCode, pageID});
      });
    });
  });
  
  socket.on('disconnect', () => {
    database.findPlayer(socket.id, (player) => {
      database.removePlayer(player[0].gameToken, socket.id, () =>{
        database.getPlayerIdMapping(player[0].gameToken, (playerId) => {
          var players = [];
          for (var prop in playerId) {
            players.push(prop);
          }
          io.in(player[0].gameToken).emit('updateState', {players}); //test at integration level
        });
      });
    });
  });
  
  socket.on('start game', (data) => {
    database.getPlayerIdMapping(data.roomname, (playerId) => {
      var playerUsername = [];
      for (var prop in playerId) {
        playerUsername.push(prop);
      }
      var roles = helpers.generateRoles(playerUsername);
      database.addRoles(data.roomname, roles, () => {
        database.getPlayerIdMapping(data.roomname, (playerId) => {
          for (var i = 0; i < playerUsername.length; i++) {
            socket.to(playerId[playerUsername[i]]).emit('updateState', {role: roles[playerUsername[i]]})
          }
        })
      })
    });
  });
  
  socket.on('mission participants', (data) => {
    // find client id of mission participants
    // emit something so frontend knows to render vote page
    // emit static page for those not participating
  });
  
  socket.on('mission votes', (data) => {
    // call helper function to determine whether failed or succeeded
    // emit to all players the result
    // store the result to the result array in database
    // if last round, check if good people won. If so, socket emit to only assassin to enter merlin
    // otherwise, emit to everyone all data results
  });
  
  socket.on('entered merlin', (data) => {
    // check if guess is correct
    // if so, send success and all other data
    // otherwise, send failure and all other data
  });
  
});

app.use(express.static(__dirname + '/../react-client/dist'));

// app.get('/', function (req, res) {
//   // serve up static files for login
// });

var port =  process.env.PORT || 3000;


server.listen(port, () => {
  console.log('listening to port 3000');
});
