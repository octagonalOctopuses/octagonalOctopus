import React from 'react';

import InfoPanel from './InfoPanel.jsx';
import Timer from './Timer.jsx';

class MissionOutcomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.nextPage = this.nextPage.bind(this);
    }

  render() {

    return (
      <div id="missionOutcome">

        <h4> Mission Outcome  </h4>

        <InfoPanel role={this.props.role} missionHistory={this.props.history}  extraInfo = {this.props.extraInfo}/>

        <p>
        Fail votes: {this.props.failVotes}
        </p>

        <p>
        Success votes: {this.props.successVotes}
        </p>

        <button onClick={this.nextPage}>
        Next Mission!
        </button>

      </div>
      )}

  nextPage() {
    if (this.props.host) {
      this.props.nextPage('EnterMissionPlayersScreen')
    } else {
      this.props.nextPage('DiscussMissionPlayersScreen')
    }
  }
}

export default MissionOutcomeScreen;
