import React from 'react';

import InfoPanel from './InfoPanel.jsx';
import Timer from './Timer.jsx';

class MerlinChoiceScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

        <h3> Choose A Player to Assassinate as Merlin </h3>


        <InfoPanel role={this.props.role} missionHistory={this.props.missionHistory} />


      <Timer seconds={this.props.spyCount * 60}/>


        An html Submit form here

      (Shown only to the Assassin)

        <button onClick={this.props.submitButtonClickHandler}>
        {'Submit'}
        </button>

      </div>
      )
  }
}

export default MerlinChoiceScreen;
