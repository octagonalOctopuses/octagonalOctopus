import React from 'react';

class PlayerEnterNameScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      roomname: '',
      nameFormValue: ''
    };

  this.handleNameChange = this.handleNameChange.bind(this);
  this.handleAccessCodeChange = this.handleAccessCodeChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.socketUserInfo= this.socketUserInfo.bind(this);
  this.backtoWelcome = this.backtoWelcome.bind(this);
  }

  handleNameChange(event) {
    this.setState({nameFormValue: event.target.value});
  }

  handleAccessCodeChange(event) {
    this.setState({roomname: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
  }

  socketUserInfo(event) {
    this.props.socket.emit('join', {username: this.state.nameFormValue,
                                    roomname: this.state.roomname});
  }

  backtoWelcome(event){
    this.props.back();
  }

  render() {
    return (
      <div id="playerEnterNameScreen">

        <h2> Join a Game of Defintely Not Avalon </h2>

        <div className="playerEnterNameScreenInput">
          <div className="playerEnterNameScreenForm">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="Token"
                placeholder="Enter Access Token"
                value={this.state.accessCodeFormValue}
                onChange={this.handleAccessCodeChange}
                />

              <input
                type="text"
                name="Name"
                placeholder="Your Name"
                value={this.state.nameFormValue}
                onChange={this.handleNameChange}
                />

              <input type="submit" value="Join" onClick={this.socketUserInfo}/>
            </form>
          </div>

            <button className="backButton" onClick={this.backtoWelcome}>
              Back
            </button>
        </div>
      </div>
      )};
}


export default PlayerEnterNameScreen;
