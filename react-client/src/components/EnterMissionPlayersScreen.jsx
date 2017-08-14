import React from 'react';

import InfoPanel from './InfoPanel.jsx';

class EnterMissonPlayersScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

      <h3> Decide who Goes on the Mission </h3>

        <InfoPanel role={this.props.role} missionHistory={this.props.missionHistory} />

        <h5> Discuss Which {this.props.missionSize} Players to Send on the Mission and enter the results:</h5>

      Appropriate widget here



        (Shown only to Game owner)
      </div>
      )
  }
}

export default EnterMissonPlayersScreen;
