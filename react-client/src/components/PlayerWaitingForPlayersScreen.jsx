import React from 'react';

class PlayerWaitingForPlayersScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

        <h2> Waiting for Players </h2>

      Implement Player List here TODO

      <p>It isn't sufficently clear how the state will handle the player lists.</p>
      
      

        <button onClick={this.props.leaveButtonClickHandler}>
        {'Leave'}
        </button>


      </div>
      )
  }
}

export default PlayerWaitingForPlayersScreen;
