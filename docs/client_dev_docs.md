#Client Side Documentation

Once a game is underway, the client gets all information from the server
via sockets and by a single event, update. Each update event will pass
to the client a `JSON` object that the client will call `setState` upon.

##Screens

The client uses strings in state.pageID to determine what screens to
render. These are:

1.  `'WelcomeScreen'`
2.  `'GameOwnerEnterNameScreen'`
3.  `'PlayerEnterNameScreen'`
4.  `'GameOwnerWaitingForPlayersScreen'`
5.  `'PlayerWaitingForPlayersScreen'`
6.  `'EnterMissionPlayersScreen'`
7.  `'DiscussMissionPlayersScreen'`
8.  `'MissionVoteScreen'`
9.  `'AwaitMissionOutcomeScreen'`
10. `'MissionOutcomeScreen'`
11. `'MerlinChoiceScreen'`
12. `'AwaitAssassinScreen'`
13. `'GameOutcomeScreen'`

These strings are also the names of the associated React components. With the
exception of `AwaitAssassinScreen` these are all encoding screens that were
detailed in the wireframe diagram and appear in the order of that diagram.

###`WelcomeScreen`

Has a New Game button and a Join button. These take the client to
`GameOwnerEnterNameScreen` and `PlayerEnterNameScreen`, respectively,
without any engagement with the server.

###`GameOwnerEnterNameScreen`

The Back button returns the Client to the `WelcomeScreen` without any
involvement of the server.

The client presents a form with a field for the Player to enter their
name. On form Submit, the client will send to the server:

```
emit("create", {username: clientPlayerNameString}
```

In response, it will get back an object with which to update state:


```
{
  accessCode: some_access_code,
  pageID: 'GameOwnerWaitingForPlayersScreen'
}
```

###`PlayerEnterNameScreen`

The client presents a form with fields for client Player Name and Access
Code.

The back Button takes the client back to the `WelcomeScreen` without any
engagement of the server.

The Submit (Join?) button will send to the server:

```
 emit("join", {username: clientPlayerNameString, roomName: accessCode})
```

The server will add that username to a list of usernames it stores for
the players involved in the room identified `roomName`. (Without prejudging
what the server calls it, here identified as `arrayOfGamePlayerNames`.)

The server will respond to the client with an object which the client
uses to update state:
```
{
 pageID: 'PlayerWaitingForPlayersScreen',
 allPlayers: arrayOfGamePlayerNames
}
```
and will send to all **other** clients of the room identified by
`roomName`, an object:

```
{
 allPlayers: arrayOfGamePlayerNames
}
```

###`GameOwnerWaitingForPlayersScreen`

The client presents an Access Code (to be shared verbally with other
players), a list of Players who have as yet joined the game, and a Start
and a Leave Button.

On hitting the Leave Button the client will send to the server:

```
 emit("leave", {roomName: AccessCode, username: clientPlayerNameString})
```

(This will cause the server to send updates to all clients involved in
the room the object

```
{
 allPlayers: arrayOfGamePlayerNames
}
```

where the client that has left has been removed from
`arrayOfGamePlayerNames`.)

(**Open Question**: how to rightly handle the **Game Owner** leaving?
This describes a client leaving, but that is not the same thing.)

On hitting the Start button, the client should

```
 emit("startgame", {roomName: accessCode, username: clientPlayerNameString })
```

and should in turn be sent by the server an object:

```
{
  role: identification_of_client_role_in_game,
  otherKnowledge: object_conveying_what_else_the_player_knows,
  missionHistory: [null, null, null, null, null],
  allPlayers: arrayOfGamePlayerNames,
  pageID: 'EnterMissionPlayersScreen',
  numberForMission: an_int_for_the_number_needed_on_next_mission
}
```

and set its state, accordingly.

The very similar object:

```
{
 role: identification_of_client_role_in_game,
 otherKnowledge: object_conveying_what_else_the_player_knows,
 missionHistory: [null, null, null, null, null],
 allPlayers: arrayOfGamePlayerNames,
 pageID: 'DiscussMissionPlayersScreen',
 numberForMission: an_int_for_the_number_needed_on_next_mission
}
```

should be sent to all other clients of the room.

As `role`, `otherKnowledge`, and `allPlayers` are consistent throughout a
given game, they can be passed to the client to `setState` with at the
point where the details of game participation are worked out. The next
mission will be mission one in this case.

### `PlayerWaitingForPlayersScreen`

Presents a Leave button and a dynamic list of client Player Names of
those who have already joined the game.

On pressing Leave, the client should redirect back to the `WelcomeScreen`
and send to the server:
```
 emit("leave", {roomName:accessCode, username: clientPlayerNameString})
```

The client will stay here until either the user presses Leave or the
client gets a socket message when the `gameOwner` presses Start on
`GameOwnerWaitingForPlayersScreen`.

### `EnterMissionPlayersScreen`

The game owner client is presented with this screen to select the
`numberForMission` many players that should be selected.

In addition to the presentation of `role`, `missionHistory`, and
`otherKnowledge` in the `infoPanel`, the screen also presents a widget for
selecting exactly `numberForMission` many players to go on the mission and
an Enter button.

Somehow(?) the widget must enforce that the correct number of players
were selected.

On hitting Enter, the client sends

```
 emit("missionparticipants",
       {roomname:accessCode,
        missionPlayers: array_of_usernames_for_players
       }
     )
```

**Open Question**: how should the players be represented? The easiest thing
for the client is to deal with them just as username strings and to let
the server work out on its end what client ids are intended.

The clients then fall into two groups: 1) those involved in the mission
and 2) those not involved.

To the clients in group (1) the server sends:

```
{
 pageID: MissionVoteScreen,
 missionPlayers: array_of_usernames_for_players
}
```

To those in group (2), the server sends:

```
 { pageID: AwaitMissionOutcomeScreen }
```

###`DiscussMissionPlayersScreen`

The clients other than the game owner are presented with this screen.
The screen displays the `infoPanel` and the instruction to discuss which
`numberForMission` players should go on the mission.

Clients remain on this page until sent an update from the server of the
form

```
 { pageID: MissionVoteScreen }
```

or:

```
 { pageID: AwaitMissionOutcomeScreen }
```

as appropriate to whether the player who owns the client in question is
one of the `missionPlayers` for the mission about to be embarked upon.
This update would be triggered by the Game Owner sending in the list of
the players to be included on the upcoming mission.

###`MissionVoteScreen`

In addition to presenting the `infoPanel`, the page informs the player who
else is on the mission with them and offers two buttons, Pass and Fail.

The client responds to the server with

```
emit('missionvote',
  {roomName: accessCode,
   username: clientPlayerNameString,
   vote: <Boolean>
  })
```
where the Boolean is `true` if the vote is for the mission to
succeed and `false` if the vote is for the mission to fail.

Strictly, the `username` is not necessary, but can be used to validate
voting / ensure that network glitches don't result in multiple copies of
a given vote, etc.

If the 30s timer runs out without the player having lodged a vote, a
default vote of mission success. **Open Question**: is this right?

###`AwaitMissionOutcomeScreen`

In addition to displaying the `infoPanel`, the page displays an
instruction to wait for the mission outcome.

The client will be taken to the next page when it receives from the
server an object of the form:

```
 { pageID: MissionOutcomeScreen,
   votes: an_array_of_booleans
 }
```

**Open question** For the votes, should the server send an array of
booleans or an object

```
 {failVotesCount: n, successVotesCount: m}
```

either as the value of `votes` in the above object or as an extension
of that object? If not, the `votes` should be shuffled before being
returned, else there might be information determinable about vote
patterns via the ordering of the booleans.

###`MissionOutcomeScreen`

In addition to dispalying the `InforPanel` the page presents a 30s `Timer`, a count of the votes to fail the mission, a count of the votes to pass the mission, and a Next button.

If the Next button was clicked, the client should cancel the `Timer`.
When the `Timer` expires or the player clicks on the Next button, the client should
```
 emit("missonresultsdone", {roomName: accessCode, userName: clientPlayerNameString}
```

If the mission whose outcome was just seen was the final mission, once all clients have responded, the server should respond to the head spy client with an object
```
 { pageID: MerlinChoiceScreen }
```
to all other spy clients with
```
 { pageID: DiscussMerlinChoiceScreen }
```
and to all non-spy clients with an object
```
 { pageID: AwaitAssassinScreen }
```

If, however, there remain missions left to run, the GameOwner client should get an object
```
{
  missionHistory: <The Appropriate 5-place array of true, false, and null values>,
  pageID: EnterMissionPlayersScreen,
  numberForMission: an_int_for_the_number_needed_on_next_mission
}
```
and non-GameOwner clients should get
```
{
  missionHistory: <The Appropriate 5-place array of true, false, and null values>,
  pageID: DiscussMissionPlayersScreen,
  numberForMission: an_int_for_the_number_needed_on_next_mission
}
```

###`MerlinChoiceScreen`



###`AwaitAssassinScreen`

###`GameOutcomeScreen`

