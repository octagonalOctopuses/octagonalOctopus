var should = require('should');
var io = require('socket.io-client');

var socketURL = 'localhost:3000';

var options ={
  transports: ['websocket'],
  'force new connection': true
};

var player1 = {'username':'player1'};
var player2 = {'username':'player2', 'roomname': '0c927'};
var player3 = {'username':'player3'};

describe("Game Room",function(){
  it('Should broadcast new user to all users', function(done){
    var client1 = io.connect(socketURL, options);

    client1.on('connect', function(data){
      client1.emit('create', player1);

      /* Since first client is connected, we connect
      the second client. */
      var client2 = io.connect(socketURL, options);

      client2.on('connect', function(data){
        client2.emit('join', player2);
      });

      client2.on('new user', function(players){
        client2.disconnect();
      });

    });

    var numUsers = 0;
    client1.on('new user', function(usersName){
      numUsers += 1;

      if(numUsers === 2){
        client1.disconnect();
        done();
      }
    });
  });
});