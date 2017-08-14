var assert = require('assert');
var expect = require('chai').expect;
var sinon = require('sinon');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var game = require('../index.js');

before((done) => {
	mongoose.connect('mongodb://localhost/').
	mongoose.connection
	.once('open' => { done(); })
	.on('error', (error) => {
		console.log('Error', error);
	});
});

beforeEach((done) => {
	mongoose.connection.collections.Game.drop(() => {
		done();
	});
});

describe('CreateGame', () => {
	it('should check for reposts with same name', sinon.test(function() {
    this.stub(game.Game, 'findOne');
    var hostName = 'Jane';
    var token = Math.floor(Math.random() * 10000);
 	var clientId = Math.floor(Math.random() * 10000);
    game.createGame(token, hostName, clientId, () => {
    	sinon.assert.calledWith(game.Game.findOne, {hostName, token, clientId});
    } 
}));
})
 
// create a game 
// game should exist
// game should have one player and one token

// find game using token and check game exists in callback 

// add player and check length of player array

// remove player and check length of player array

// add results and check length of results array

// 