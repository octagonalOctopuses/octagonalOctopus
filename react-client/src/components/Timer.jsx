import React from 'react';

class Timer extends React.Component {

  constructor(props) {
    super(props);
    this.seconds = props.seconds
  }

  render() {

    return (
      <div>
      Some Timer Widget here for {this.seconds} seconds
      </div>
      )
  }
}

export default Timer;
