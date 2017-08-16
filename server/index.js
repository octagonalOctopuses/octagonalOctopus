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
    database.addPlayer(data.roomname, data.username, socket.id, () => {
      database.getPlayerIdMapping(data.roomname, (playerId) => {
        var players = [];
        for (var prop in playerId) {
          players.push(prop);
        }
        console.log(players, 'join');
        io.in(data.roomname).emit('updateState', {players});
      })
    });
  });

  socket.on('create', (data) => {
    var accessCode = '0c927' //helpers.generateToken();
    socket.join(accessCode);
    var pageID = 'GameOwnerWaitingForPlayersScreen'
    database.createGame(accessCode, data.username, socket.id, () => {
      socket.emit('updateState', {accessCode, pageID});
    });
  });
  
  socket.on('disconnected', () => {
    module.exports.removePlayer(socket.rooms[0], socket.id, () =>{
      database.getPlayerIdMapping(socket.room[0], (playerId) => {
        var players = [];
        for (var prop in playerId) {
          players.push(prop);
        }
        console.log(players, 'leave');
        io.in(socket.rooms[0]).emit('updateState', {players});
      });
    });
  });
  
  socket.on('start game', (data) => {
    // retrieve all saved players from database
    // call random role generating function
    // store roles into database
    // send out individual emits to each client depending on role
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
