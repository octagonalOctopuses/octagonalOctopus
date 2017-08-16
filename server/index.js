var express = require('express');
var app = express();
var server = require('http').createServer(app);

var bodyParser = require('body-parser');
var helpers = require('./helper-functions');

var io = require('socket.io')(server);
var database = require('../database-mongo');
app.use(express.static(__dirname + '/../react-client/dist'));

var port =  process.env.PORT || 3000;


server.listen(port, () => {
  console.log('listening to port 3000');
});

// io.on('connection', (socket) => {
//   console.log(socket.id);
//   console.log('hello *** abhi ****');
  
//   //socket.emit('test', {testdata: 'data'});
//  socket.on('create', (data)=>{
//   console.log(data);
//     });
 
//   socket.on('join', (data) => {
//     console.log(data);
    // socket.join(roomname)
    // write to document in database
    // database should store username and client id mapping
    // broadcast to players in game that new player joined
  // });


  // socket.on('create', (data) => {
  //   console.log('hiiiiii');
  //   socket.emit('hiii');
  //   // create random roomtoken
  //   // create game in database and add this client
  //   // socket.join(roomname)
  //   // return the token to the client
  //   // store client id in an object with key as username
  //   // database should store username and client id mapping
  // });
  
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



app.get('/', function (req, res) {
  // serve up static files for login
  res.send();
});


