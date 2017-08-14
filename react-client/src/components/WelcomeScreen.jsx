import React from 'react';

class WelcomeScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

        <h2> Welcome to Definitely Not Avalon </h2>

        <p>
            Clicking 'New Game' will make you the owner of a game and
            you will get a short code to give to your friends so that
            they can join your game.
        </p>

        <p>
            Clicking 'Join' will take you to a screen where you can
            enter a short code given to you by the owner of a game to
            join that game.
        </p>

        <button onClick={this.props.newButtonClickHandler}>
        {'New Game'}
        </button>

        <button onClick={this.props.joinButtonClickHandler}>
        {'Join'}
        </button>


      </div>
      )
  }
}

export default WelcomeScreen;
