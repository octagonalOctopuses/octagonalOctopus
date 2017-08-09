import React from 'react';

class MissonVote extends React.Component {

  constructor(props) {
    super(props);
    this.players = props.players
  }

  playersToString () => {
    // TODO rendered nicely as a string with the Oxford coma if more than two
    // others are joining the player who sees this screen on the mission.
    return props.player.toString();
  }

  render() {

    return (
      <div>

      <Stats />

      <Timer />

        <h3> Mission Vote </h3>
        You are on a mission with {this.playersToString()} Nice prompt here

        <FailButton /> <PassButton />

        (Shown only to players on the Mission)
      </div>
      )
  }
}

export default MissonVote
