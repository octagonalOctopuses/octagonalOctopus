import React from 'react';

import InfoPanel from './InfoPanel.jsx';
import Timer from './Timer.jsx';

class MissionOutcomeScreen extends React.Component {

  constructor(props) {
    super(props);

    }

  render() {

    return (
      <div>

        <h4> Mission Outcome  </h4>

        <InfoPanel role={this.props.role} missionHistory={this.props.missionHistory} />

        <Timer seconds={30}/>

        <p>Fail votes: {this.props.failVotes}</p>

        <p>Success votes: {this.props.successVotes}</p>

      NextButton with clickHandler=this.clickHandler

      </div>
      )
  }
}

export default MissionOutcomeScreen;
