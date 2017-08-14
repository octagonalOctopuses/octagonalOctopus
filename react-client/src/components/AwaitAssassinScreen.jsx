import React from 'react';

import InfoPanel from './InfoPanel.jsx';
import Timer from './Timer.jsx';

class AwaitAssassinScreen extends React.Component {

  constructor(props) {
    super(props);

    this.spyCount = 3 // Needs to be passed down appropriately

  }

  render() {

    return (
      <div>

      <h3> Awaiting Assassin </h3>

      <InfoPanel role={this.props.role} missionHistory={this.props.missionHistory} />

      <Timer seconds={this.spyCount * 60}/>

      (Shown to non-spy players)
      </div>
      )
  }
}

export default AwaitAssassinScreen;
