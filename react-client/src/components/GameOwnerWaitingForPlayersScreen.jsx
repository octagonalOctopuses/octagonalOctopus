import React from 'react';

class GameOwnerWaitingForPlayersScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

        <h2> Waiting for Players </h2>

      <p>Access Code: {this.props.accessCode}</p>

      Implement Player List here TODO

      <p>It isn't sufficently clear how the state will handle the player lists.</p>



        <button onClick={this.props.leaveButtonClickHandler}>
        {'Leave'}
        </button>

        <button onClick={this.props.startButtonClickHandler}>
        {'Start'}
        </button>



      </div>
      )
  }
}

export default GameOwnerWaitingForPlayersScreen;
