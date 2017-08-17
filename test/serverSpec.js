// var io = require('socket.io-client');

// var assert = require('assert');
// var expect = require('chai').expect;

// var database = require('../database-mongo');

// var options ={
//   transports: ['websocket'],
//   'force new connection': true
// };

// // database.removeAllGames(() => {});

// // client1 = io.connect('http://localhost:3000');
// // client1.on('connect', (data) => {
// //   client1.emit('create', {username: 'host'});
// // });

// client2 = io.connect('http://localhost:3000');
// client2.on('connect', (data) => {
//   client2.emit('join', {username: 'player2', roomname: '0c927'});
//   client2.emit('start game', {roomname: '0c927'});
// });


// client2.on('updateState', (data) => {
//   console.log(data);
// })


// // client1.on('updateState', (data) => {
// //   console.log(data);
// // })

// // describe('Create Room', function() {
// //   it('server should respond to create game with accessCode', function(done){
// //     var client1 = io.connect('http://localhost:3000');    
// //       client1.on('connect', (data) => {
// //       client1.emit('create', {username: 'host'});
// //       client1.on('updateState', (data) => {
// //         expect(data).to.have.property('accessCode');
// //         client1.disconnect();
// //       })
// //       done();
// //     })
// //   });
//   // it('server should respond to create game with correct page to render', function(done){
//   //   var client1 = io.connect('http://localhost:3000');
//   //   client1.on('connect', (data) => {
//   //     client1.emit('create', {username: 'host'});
//   //     client1.on('updateState', (data) => {
//   //       assert.equal(data.pageID, 'GameOwnerWaitingForPlayersScreen');
//   //     })
//   //     client1.disconnect();
//   //     done();
//   //   })
//   // });
// // });

// // describe('Joining Room', function() {
// //   it('server should respond to all clients with players list', function(done) {
// //     var client2 = io.connect('http://localhost:3000');
// //     client2.on('connect', (data) => {
// //       client2.emit('join', {username: 'player1', roomname: '0c927'});
// //       client2.on('updateState', (data) => {
// //         expect(data).to.have.property('players');
// //       });
// //       client2.disconnect();
// //       done();
// //     });
// //   });
// // });



