import React from 'react';

class Timer extends React.Component {

  constructor(props) {
    super(props);
    this.seconds = props.seconds
  }

  render() {

    return (
      <div>
      Some Timer Widget here      
      </div>
      )
  }
}

export default Timer;
