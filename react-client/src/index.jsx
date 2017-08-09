import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 

      // State like things that don't exist on the app's first render,
      // but depend on a a Game having been created, joined by
      // players, and started.
      players: [],
      role: undefined,
      otherCharInfo = {},

      // Another worry: do games with many players have more rounds?
      // In which case, roundsHistory isn't the right thing.
      roundsHistory: [null, null, null, null, null],

      missionParticipation = [],
    }
  }

  componentDidMount() {
  }

  render () {

    // This is all going to have to be done with an if test chain or a
    // swith statement. I am not familiar with the react router tool
    // that has been suggested to use here, so I'm passing over it for
    // now.

    return (<div>

    ????

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
