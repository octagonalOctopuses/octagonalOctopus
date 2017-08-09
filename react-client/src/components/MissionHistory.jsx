import React from 'react';

class MissionHistory extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

        <h5> Mission History Glyphs, here </h5>

        Uncertain exactly what we will use. As per early discussion, circles with
        red for failed, green for passed grey for future and white for current.

        Early discussion also suggested using an array, with true representing a 
      passed mission, false a failed one, and null one yet to be decided.
      </div>
      )
  }
}

export default MissionHistory;
