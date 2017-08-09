import React from 'react';

class MissionOutcome extends React.Component {

  constructor(props) {
    super(props);

    this.failVotes = props.failVotes;
    this.successVotes = props.successVotes;
    }


  render() {

    return (
      <div>

        <h5> Mission Outcome  </h5>


         <Stats /> <Timer seconds={30}/>

        Fail votes: {this.failVotes}

        Success votes: {this.successVotes}

      NextButton with clickHandler=this.clickHandler

      </div>
      )
  }
}

export default MissionOutcome;
