import React from 'react';

class GameOutcome extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    identities = []
    // Here, will have to itterate over players, creating <Identity> compenents.

    return (
      <div>

        <h5> Game Outcome  </h5>

         Here, we seem to have missed some components of use. I thus inaguate them:

         {identities}

         <NewGameButton />
         // Unclear from discussion if Buttons should be components
      </div>
      )
  }
}

export default GameOutcome;
