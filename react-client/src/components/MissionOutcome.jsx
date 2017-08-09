import React from 'react';

class MissionOutcome extends React.Component {

  constructor(props) {
    super(props);

    this.failVotes = props.failVotes;
    this.successVotes = props.successVotes;
    }

  clickHandler() {
    // Do click stuff. Presently, unclear 1) what to send to server and
    // 2) if the function can live here and be called from within the
    // render method or if it needs to be bound at app level and messages
    // sent from there.
    }

  render() {

    return (
      <div>

        <h5> Mission Outcome  </h5>


         <Stats /> <Timer seconds={30}/>

        Fail votes: {this.failVotes}

        Success votes: {this.successVotes}

         <NextButton clickHandler={this.clickHandler()}/>
         // Unclear from discussion if Buttons should be components
      </div>
      )
  }
}

export default MissionOutcome;
