import React from 'react';

class Stats extends React.Component {

  constructor(props) {
    super(props);

    this.role = props.role;
    this.missionHistory = props.missionHistory;
    this.otherCharInfo = props.otherCharInfo;
  }

  render() {

    return (
      <div>
      <h6> Stats Panel </h6>

      Your role is {this.role}

        <MissionHistory />

      Other Knowledge (A component?)
      
      </div>
      )
  }
}

export default Stats;
