import React from 'react';

class MissionHistory extends React.Component {

  constructor(props) {
    super(props);
    this.glyphs = [];
    for (var i=0; i<props.missionHistory.length; i++) {

      // Obviously, this will need to be replaced with something a bit
      // more stylish. We might, however, get away with pushing glyphs
      // to an array and rendering the array as the way rows are dealt
      // with in step 5 of
      // https://facebook.github.io/react/docs/thinking-in-react.html
      if (props.missionHistory[i]) { this.glyphs.push('+'); }

      if (props.missionHistory[i] === false) { this.glyphs.push('-'); }

      if (props.missionHistory[i] === null) { this.glyphs.push('_'); }

    }
  }

  render() {

    return (
      <div>

        <h6> Mission History: {this.glyphs.join(' ')}  </h6>
      </div>
      )
  }
}

export default MissionHistory;
