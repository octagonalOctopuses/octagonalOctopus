import React from 'react';

class PickMissonPlayer extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

      <Stats />

      <Timer />

        <h3> Pick Mission Players </h3>

        Pick {this.props.missionCount} players to go:

        Appropriate Widget here

        (Shown only to Game owner)
      </div>
      )
  }
}

export default PickMissonPlayer;
