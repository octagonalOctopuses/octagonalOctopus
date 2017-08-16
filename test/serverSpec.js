var io = require('socket.io-client');

var assert = require('assert');
var expect = require('chai').expect;

var options ={
  transports: ['websocket'],
  'force new connection': true
};

// describe('Socket Connection', function() {
//   it('should connect ot server and recieve test data', function(done){
//     var client1 = io.connect('http://localhost:3000');
//     client1.on('test', function(data) {
//       assert.equal(data.testdata, 'data');
//       done();
//     });
//   });
// });

describe('Create Room', function() {
  it('server should respond to create game with accessCode', function(done){
    var client1 = io.connect('http://localhost:3000');    
      client1.on('connect', (data) => {
      client1.emit('create', {username: 'host'});
      client1.on('updateState', (data) => {
        expect(data).to.have.property('accessCode');
      })
      client1.disconnect();
      done();
    })
  });
  it('server should respond to create game with correct page to render', function(done){
    var client1 = io.connect('http://localhost:3000');
    client1.on('connect', (data) => {
      client1.emit('create', {username: 'host'});
      client1.on('updateState', (data) => {
        assert.equal(data.pageID, 'GameOwnerWaitingForPlayersScreen');
      })
      client1.disconnect();
      done();
    })
  });
});

describe('Joining Room', function() {
  it('server should respond to all clients with players list', function(done) {
    var client2 = io.connect('http://localhost:3000');
    client2.on('connect', (data) => {
      client2.emit('join', {username: 'player1', roomname: '0c927'});
      client2.on('updateState', (data) => {
        expect(data).to.have.property('players');
      });
      client2.disconnect();
      done();
    });
  });
});

describe('Leaving Room', function() {
  it('Should broadcast new user to all users', function(done){
  var client1 = io.connect('http://localhost:3000', options);

  client1.on('connect', function(data){
    client1.emit('create', {username: 'player1'});

    var client2 = io.connect('http://localhost:3000', options);

    client2.on('connect', function(data){
      client2.emit('join', {roomname: '0c927', username: 'player2'});
    });

    client2.on('new user', function(usersName){
      usersName.should.equal(chatUser2.name + " has joined.");
      client2.disconnect();
    });

  });

  var numUsers = 0;
  client1.on('new user', function(usersName){
    numUsers += 1;

    if(numUsers === 2){
      usersName.should.equal(chatUser2.name + " has joined.");
      client1.disconnect();
      done();
    }
  });
});

});


















