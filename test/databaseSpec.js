var assert = require('assert');
var expect = require('chai').expect;
var mongoose = require('mongoose');

var database = require('../database-mongo/index.js');




database.removeAllGames(() => {
  
})


// describe('CreateGame', () => {
// 	it('should check for reposts with same name', sinon.test(function() {
//     this.stub(game.Game, 'findOne');
//     var hostName = 'Jane';
//     var token = Math.floor(Math.random() * 10000);
//  	var clientId = Math.floor(Math.random() * 10000);
//     game.createGame(token, hostName, clientId, () => {
//     	sinon.assert.calledWith(game.Game.findOne, {hostName, token, clientId});
//     } 
//   })
// );
// })
 
