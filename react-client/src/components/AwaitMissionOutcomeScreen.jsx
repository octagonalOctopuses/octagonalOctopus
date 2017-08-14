import React from 'react';

import InfoPanel from './InfoPanel.jsx';
import Timer from './Timer.jsx';

class AwaitMissionOutcomeScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

        <h3> Awaiting Mission Outcome </h3>

        <InfoPanel role={this.props.role} missionHistory={this.props.missionHistory} />

      <p></p>

      <Timer seconds={30}/>



        <p>(Shown to all players not on the mission. As players vote, they
        are taken here. Except the last to vote, which triggers all
        players being sent to the MissionOutcomeScreen)</p>
      </div>
      )
  }
}

export default AwaitMissionOutcomeScreen;
