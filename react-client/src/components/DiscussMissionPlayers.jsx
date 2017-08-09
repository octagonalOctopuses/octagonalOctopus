import React from 'react';

class DiscussMissionPlayers extends React.Component {

  constructor(props) {
    super(props);
    this.missionSize = props.missionSize // Unclear where from
  }

  render() {

    return (
      <div>

      <Stats />


        <h3> Discuss Which {this.missionSize} Players to Send on the Mission </h3>
        (Shown to all players except for game owner)
      </div>
      )
  }
}

export default DiscussMissionPlayers;
