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

      roundsHistory: [null, null, null, null, null],

      missionParticipation = [],
    }
  }

  componentDidMount() {
  }

  render () {

    // Suggestion that server sends a next page identifier to client
    // and client uses to look up which render function to run, here.
    // So, something like:

    //     renderFunction = renderFunctionsObject[this.state.nextPageID]
    //     return renderFunction()

    // This makes all the decision logic live on the server.

    return (<div>

    ????

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
