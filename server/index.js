var express = require('express');
var app = express();
var server = require('http').createServer(app);

var bodyParser = require('body-parser');
var helpers = require('./helper-functions');

var io = require('socket.io')(server);
var database = require('../database-mongo');

io.on('connection', (socket) => {
  console.log('hello');
  socket.emit('test', {testdata: 'data'})


  socket.on('join', (data) => {
    console.log(data.room);
    // socket.join(roomname)
    // write to document in database
    // database should store username and client id mapping
    // broadcast to players in game that new player joined
  });

  socket.on('create', (data) => {
    // create random roomtoken
    // create game in database and add this client
    // socket.join(roomname)
    // return the token to the client
    // store client id in an object with key as username
    // database should store username and client id mapping
  });
  
  socket.on('leave', (data) => {
    // socket.leave(roomname);
    // remove client from database
    // 
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


app.listen(port, () => {
  console.log('listening to port 3000');
  database.removeAllGames(() => {
    database.createGame('12345', 'host', 'aaaa', () => {
      database.addPlayer('12345', 'player1', 'bbbb', () => {
        database.addRoles('12345', {'host': 'Spy1', 'player1': 'Merlin'}, () => {
          database.removePlayer('12345', 'player1', () => {
            database.updateResults('12345', [false, false, true], () => {
              database.getMerlin('12345', (merlin) => {
                console.log(merlin, 'Merlin');
              })
              database.getPlayerRoleMapping('12345', (playerRoles) => {
                console.log(playerRoles, 'playerRoles');
              })
              database.selectGame('12345', (game) => {
                console.log(game, 'game object');
              })
            })
          })
        })  
      })
    })
  })
});




















