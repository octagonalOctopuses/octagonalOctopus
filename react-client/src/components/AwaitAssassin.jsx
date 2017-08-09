import React from 'react';

class AwaitAssassin extends React.Component {

  constructor(props) {
    super(props);

    this.spyCount = 3 // Needs to be passed down appropriately

  }

  render() {

    return (
      <div>

      <Stats />

      At most <Timer seconds={this.spyCount * 60}/>

        <h3> Awaiting Assassin </h3>
        (Shown to non-spy players)
      </div>
      )
  }
}

export default AwaitAssassin;
