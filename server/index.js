var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');

var helpers = require('./helper-functions');
var database = require('../database-mysql');
io.on('connection', (socket) => {

  socket.on('join', (data) => {
    socket.join(data.roomname);
    database.addPlayer(data.roomname, false, data.username, socket.id, () => {
      database.getAllUsernames(data.roomname, (players) => {
        var pageID = 'PlayerWaitingForPlayersScreen'
        io.in(data.roomname).emit('updateState', {players, pageID})
      });
    });
  });

  socket.on('create', (data) => {
    var accessCode = '0c927' //helpers.generateToken();
    socket.join(accessCode);
    database.createGame(accessCode, () => {
      var players = [data.username];
      database.addPlayer(accessCode, true, data.username, socket.id, () => {
        var pageID = 'GameOwnerWaitingForPlayersScreen'
        socket.emit('updateState', {accessCode, players, pageID});
      });
    });
  });
  
  socket.on('disconnect', () => {
    database.removePlayer(socket.id, (gameToken) => {
      database.getAllUsernames(gameToken, (players) => {
        io.in(gameToken).emit('updateState', {players})
      });
    });
  });
  
  socket.on('start game', (data) => {
    database.updateVotesAndParticipantNum(data.roomname, () => {
      database.getAllSocketIds(data.roomname, (socketids) => {
        var roles = helpers.generateRoles(socketids);
        database.getHost(data.roomname, (host) => {
          var pageID = 'EnterMissionPlayersScreen';
          var role = roles[host.socketid];
          socket.to(host.socketid).emit('updateState', {role, pageID});
          for (var i = 0; i < socketids.length; i++) {
            if (socketid[i] !== host.socketid) {
              var role = roles[socketids[i]];
              var pageID = 'DiscussMissionPlayersScreen';
              socket.to(socketids[i]).emit('updateState', {role, pageID});
            }
          }
          });
        });
      });
    });
  });

  socket.on('mission participants', (data) => {
    for (var i = 0; i < data.participants; i++) {
      var participantsockets = [];
      database.getSocketId(data.participants[i], (socketid) => {
        participantsockets.push(socketid);
        socket.to(socketid).emit('updateState', {pageID: 'MissionVoteScreen'});
      });
    }
    database.getAllSocketIds(data.roomname, (socketids) => {
      for (var i = 0; i < socketids; i++) {
        if (data.participants.indexOf(socketids[i]) === -1) {
          socket.to(socketids[i]).emit('updateState', {pageID: 'AwaitMissionOutcomeScreen'})
        }
      }
    });
  });

    const computeResult = (data, callback) => {
    database.addVotes(data.roomname, data.vote, (votesArray) => {
      database.votesNeeded(data.roomname, (votesNeeded) => {
        if (votesArray.length === votesNeeded) {
          database.votingInfo(data.roomname, (numPlayers, missionNumber) => {
            var result = helpers.missionResults(numPlayers, missionNumber, votesArray); // need a change from helper function
            callback(result);
          });
        }
      });
    });
  };

  
  socket.on('mission votes', (data) => {
    computeResult(data, (result) => {
      database.updateResults(data.roomname, result, () => {
        database.getResults(data.roomname, (results) => {
          if (results.length < 5) {
            database.getHost(data.roomname, (host) => {
              var pageID = 'EnterMissionPlayersScreen';
              var role = roles[host.socketid];
              socket.to(host.socketid).emit('updateState', {results, pageID});
              database.getAllSocketIds(data.roomname, (socketids) => {
                for (var i = 0; i < socketids.length; i++) {
                  if (socketid[i] !== host.socketid) {
                    var role = roles[socketids[i]];
                    var pageID = 'DiscussMissionPlayersScreen';
                    socket.to(socketids[i]).emit('updateState', {results, pageID});
                  }
                }
              })
            });
          } else {
            var finalOutcome = helpers.gameOutcome(results);
            if (finalOutcome) {
              database.getMordred(data.roomname, (mordred) => {
                var pageID = 'MerlinChoiceScreen'
                socket.to(mordred.socketid).emit('updateState', {pageID});
              })
              database.getAllSocketIds(data.roomname, (socketids) => {
                for (var i = 0; i < socketids.length; i++) {
                  if (socketid[i] !== mordred.socketid) {
                    var role = roles[socketids[i]];
                    var pageID = 'AwaitAssassinScreen';
                    socket.to(socketids[i]).emit('updateState', {pageID});
                  }
                }
              });
            }
          }
        });
      });
    });
  });

  
  socket.on('entered merlin', (data) => {
    database.getMerlin(data.roomname, (merlin) => {
      database.getResults(data.roomname, (results) => {
        var merlinGuessed = (merlin.username === data.merlin);
        io.in(data.roomname).emit('updateState', {results, merlinGuessed}) //FIXME
      });
    });
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
