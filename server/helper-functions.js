const _ = require('underscore');
const db = require('../database-mongo');

// key represents number of players.
// values represent the different roles that will be played
const roles = {
  5: ['Mordred', 'Merlin', 'Loyal Servant', 'Loyal Servant', 'Minion of Mordred'],
  6: ['Mordred', 'Merlin', 'Loyal Servant', 'Loyal Servant', 'Minion of Mordred', 'Loyal Servant'],
  7: ['Mordred', 'Merlin', 'Loyal Servant', 'Loyal Servant', 'Minion of Mordred', 'Percival', 'Morgana'],
  8: ['Mordred', 'Merlin', 'Loyal Servant', 'Loyal Servant', 'Minion of Mordred', 'Percival', 'Morgana', 'Loyal Servant'],
  9: ['Mordred', 'Merlin', 'Loyal Servant', 'Loyal Servant', 'Minion of Mordred', 'Percival', 'Morgana', 'Loyal Servant', 'Oberon'],
  10: ['Mordred', 'Merlin', 'Loyal Servant', 'Loyal Servant', 'Minion of Mordred', 'Percival', 'Morgana', 'Loyal Servant', 'Oberon', 'Loyal Servant'],
}

// key represents number of players.
// values represent number of players that
// will go on a mission. The index
// represents what mission it is.
const numPeopleOnMission = {
  5: [2,3,2,3,3],
  6: [2,3,4,3,4],
  7: [2,3,3,4,4],
  8: [3,4,4,5,5],
  9: [3,4,4,5,5],
  10: [3,4,4,5,5]
}

// key represents number of players.
// values represent how many votes it will
// take to fail a mission. The index
// represents what mission it is.
const numFailuresNeeded = {
  5: [1,1,1,1,1],
  6: [1,1,1,1,1],
  7: [1,1,1,2,1],
  8: [1,1,1,2,1],
  9: [1,1,1,2,1],
  10: [1,1,1,2,1]
}

module.exports.missionResult = (playerCount, roundNum, numFailures) => {
  // depending on number of players and round, returns
  // if mission passed (true) or not (false)

  // if numFailures is equal or greater to what is needed to fail for
  // the given amount of players return true, otherwise false.
  return numFailures >= numFailuresNeeded[playerCount][roundNum];
};

module.exports.generateRoles = (usernames) => {
  // given array of usernames generate object mapping username
  // to roles

  // output array of users roles
  let userRoles = {}
  // get the length of the usernames.
  const key = Object.keys(usernames).length;
  // shuffle the roles
  const shuffleRoles = _.shuffle(roles(key));

  // iterate through usernames
  for (let i = 0; i < usernames.length; i++) {
    //add username as key and role as value
    userRoles.usernames[i] = shuffleRoles[i];
  }
  return userRoles;
};

module.exports.merlinGuessResult = (token, merlinGuess) => {
  // query database for real merlin
  // return true or false

  // Callback for getMerlin
  let returnMerlin = function(merlin) {
    return merlin === merlinGuess;
  }

  db.getMerlin(token, returnMerlin);
};

module.exports.gameOutcome = (missionResults) => {
  // given mission results array, determine if good people won (true)

  const neededFailures = 3;

  // Filter out all false values. Take the length and
  // if it is greater than neededFailures return false (spies win).
  if (missionRessults.filter(e => !e).length >= neededFailures) { return false; }
};

module.exports.extraInfoAssignment = (token, userRoleMapping) => {
  // accepts an object with user to role mapping then
  // returns an array of objects with an object of userId as key and special roles as another object.
  // special roles object has role as key and an array of usernames for value.

  //*****Special Roles******
  // Spies: all spies except Oberon
  // Merlin: all spies except Mordred (headspy)
  // Percival: can see Merlin and Morgana but does not know which is which.
  //************************


  const numPlayers = Object.keys(userRoleMapping).length;
  let extraInfo = [];

  // return all usernames of spies, headspy will be last.
  // if more than 6 players, Morgana will be last and
  // the headspy will be second to last.
  getAllSpies = () => {
    let headSpy,
        morgana,
        spies = [];

    // iterate thorough checking/adding spy roles.
    for (let key in userRoleMapping) {
      if (userRoleMapping[key] === 'Minion of Mordred') {
        spies.push(key);
      } else if (userRoleMapping[key] === 'Mordred') {
        headSpy = key;
      } else if (userRoleMapping[key] === 'Morgana') {
        morgana = key;
      }
    }
    // add headspy (Mordred).
    spies.push(headspy);
    // if morgana exists, add him. Otherwise do nothing.
    morgana !== undefined ? spies.push(morgana) : false;
    return spies;
  }

  // Callback for database query.
  // Gets all info to return and assigns to
  // special roles to an object.
  getInfo = (playerIds) => {
    let userId = playerIds[key],
        usersInfo = {},
        roleToUsers = {}, // roleToUsers example, {'Spies': [user1, user2], ...}
        spies = getAllSpies(), // array containing usernames of all the spies
        onlyMinions, merlin, morgana, mordred;

    // get merlin from the database
    db.getMerlin(token, (userMerlin) => {merlin = userMerlin;})

    for (let key in userRoleMapping) {

      // if morgana exists, he is last spy. Mordred(headSpy) is second to last.
      if (numPlayers > 6) {
        morgana = spies[spies.length-1];
        mordred = spies[spies.length-2];
        onlyMinions = spies.splice(spies.length-2, 1);
      } else {
        mordred = spies[spies.length-1];
        onlyMinions = spies.slice(0, -1);
      }

      // mix array of spies so that mordred and morgana do not
      // always show last.
      spies = _.shuffle(spies);

      if (userRoleMapping[key] === 'Minion of Mordred') {
        roleToUsers['Spies'] = spies;
      } else if (userRoleMapping[key] === 'Merlin') {
        roleToUsers['onlyMinions'] = onlyMinions;
      } else if (userRoleMapping[key] === 'Percival') {
        roleToUsers['morganaOrMerlin'] = _.shuffle([morgana, merlin]);
      }
      // {userId: {'Spies': [user1, user2], ...}}
      usersInfo[userId] = roleToUsers;

      extraInfo.push(usersInfo);
    }
  }

  db.getPlayerIdMapping(token, getInfo);

  return extraInfo;
}

module.exports.generateToken = () => {
  // generates and returns a random token.
  // used as the key to enter a room.

  // list containing numbers and characters for the random string
  const stringArray = ['0','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','k',
                    'o','p','q','r','s','t','u','v','w','x','y','z'];

  let token = '';
  // build a string with random characters with length of 6
	for (let i = 1; i < 6; i++) {
		let randomNum = Math.ceil(Math.random() * stringArray.length) - 1;
		token = token + stringArray[randomNum];
	};

  return token;
}
