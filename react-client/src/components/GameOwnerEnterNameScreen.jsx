import React from 'react';

class GameOwnerEnterNameScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nameFormValue: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.gettingHostUsername = this.gettingHostUsername.bind(this);
  }

  handleNameChange(event) {
    this.setState({nameFormValue: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  gettingHostUsername(event){
    this.props.hostsubmit({username: this.state.nameFormValue});
  }



  render() {

    return (
      <div>

        <h2> Please Enter your Name </h2>

        
        <form onSubmit={this.handleSubmit} >
        <input
      type="text"
      name="Name"
      value={this.state.nameFormValue}
      onChange={this.handleNameChange}
        />

        <input type="submit" value="Submit" onClick={this.gettingHostUsername}/>
        </form>

        <button onClick={this.props.backButtonClickHandler}>
        {'Back'}
        </button>

     </div>
    )}
}

export default GameOwnerEnterNameScreen;
