import React from 'react';

import MissionHistory from './MissionHistory.jsx';


class GameOutcomeScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (

      <div>

        <h5> Game Outcome  </h5>

      <MissionHistory missionHistory={this.props.missionHistory}/>

         <p>Report on which side won.</p>

         <p>Have a list of identities in the game. Coordinate with websocket person</p>

        <button onClick={this.props.againButtonClickHandler}>
        {'Play Again'}
        </button>

      </div>
      )
  }
}

export default GameOutcomeScreen;
