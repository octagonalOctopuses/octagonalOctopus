import React from 'react';

import InfoPanel from './InfoPanel.jsx';
import Timer from './Timer.jsx';

class MissionVoteScreen extends React.Component {

  constructor(props) {
    super(props);
    this.players = props.players
  }

  playersToString () {

    // Hey, wait. This needs to know which Player the app is speaking
    // to. So, it needs a prop down from the server, or perhaps more
    // reasonably, storing it locally beofre sending it to the server
    // in the first place. Think a bit. Maybe discuss.

    // At any rate, right now, the player how is looking at the screen
    // will wrongly be included in the list of players on the mission.
    // Fixme

    var pString = this.players.join(', and ');
    if (this.players.length === 2) {
      // Remove oxford comma in case of only two
      pString = this.players.join(' and ');
    }
    return pString;
  }

  render() {

    return (
      <div>

        <h3> Mission Vote </h3>

        <InfoPanel role={this.props.role} missionHistory={this.props.missionHistory} />

        <Timer seconds={30}/>


        <p>You are on a mission with {this.playersToString()}.</p>


        <p>Do you want the mission to fail or succeed?</p>

        <button onClick={this.props.failMissionButtonClickHandler}>
        {'Mission Fails'}
        </button>

        <button onClick={this.props.passMissionButtonClickHandler}>
        {'Mission Succeeds'}
        </button>

        <p>(Shown only to players on the Mission)</p>
      </div>
      )
  }
}

export default MissionVoteScreen
