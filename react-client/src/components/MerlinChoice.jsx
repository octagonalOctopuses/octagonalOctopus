import React from 'react';

class MerlinChoice extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

      <Stats />

      <Timer seconds={this.spyCount * 60}/>

        <h3> Choose Merlin </h3>

        A Submit button here

        (Shown only to the Assassin)
      </div>
      )
  }
}

export default MerlinChoice;
