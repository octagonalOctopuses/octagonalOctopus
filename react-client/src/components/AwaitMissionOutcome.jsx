import React from 'react';

class AwaitMissionOutcome extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

      <Stats />

      <Timer seconds={30}/>

        <h3> Awaiting Mission Outcome </h3>
        (Shown to all players not on the mission [what of the last to vote?])
      </div>
      )
  }
}

export default AwaitMissionOutcome;
