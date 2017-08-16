import React from 'react';

class PlayerEnterNameScreen extends React.Component {

  constructor(props) {
    super(props);

    console.log(props);
    this.state = {
      accessCodeFormValue: '',
      nameFormValue: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAccessCodeChange = this.handleAccessCodeChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.socketUserInfo= this.socketUserInfo.bind(this);
  }

  handleNameChange(event) {
    this.setState({nameFormValue: event.target.value});
  }

  handleAccessCodeChange(event) {
    this.setState({accessCodeFormValue: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
  }

  socketUserInfo(event) {
    this.props.getuserinfo({username: this.state.nameFormValue,
                            roomname: this.state.accessCodeFormValue});
  }

  render() {

    return (
      <div>

        <h2> Join a Game of Defintely Not Avalon </h2>

      

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

        <button onClick={this.props.backButtonClickHandler}>
        {'Back'}
        </button>

     

      </div>
      )};
}


export default PlayerEnterNameScreen;
