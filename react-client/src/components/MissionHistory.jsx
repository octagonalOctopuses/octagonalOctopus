import React from 'react';

class MissionHistory extends React.Component {

  constructor(props) {
    super(props);

    // Here just to flag that cintaining component (Stats) will pass
    // the history down as a prop.
    this.history = props.history
  }

  render() {

    return (
      <div>

        <h5> Mission History Glyphs, here </h5>

      </div>
      )
  }
}

export default MissionHistory;
