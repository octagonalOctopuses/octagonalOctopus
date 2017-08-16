import React from 'react';

class Timer extends React.Component {

  constructor(props) {
    super(props);
    //this.seconds = props.seconds
     this.state = {seconds: 30 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

 startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      //time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer);
    }
  }
  // timer() {
  //   this.setState({sec: this.sec}, ()=>{
  //       setInterval(()=>{
  //     if(this.sec === 0) {
  //       this.sec = 10;
  //       //this.setState({sec: 10});
  //       return;
  //     }

  //     this.sec--;
  //     //console.log(this.sec);
      
  //     console.log(this.state.sec);
  //   }, 1000)

  //   })
    
  // }

  render() {

    return (
      
      <div>
      {this.startTimer()}
        Time left: {this.state.seconds} seconds
      </div>
    )}
}

export default Timer;
