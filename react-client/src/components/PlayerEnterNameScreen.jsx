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
//    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({nameFormValue: event.target.value});
  }

  handleAccessCodeChange(event) {
    this.setState({accessCodeFormValue: event.target.value});
  }

  render() {

    return (
      <div>

        <h2> Join a Game of Defintely Not Avalon </h2>

      I do not presently know how to deal with the html form

        <form onSubmit={this.props.submitButtonClickHandler}>
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

        <input type="submit" value="Submit"/>
        </form>

        <button onClick={this.props.backButtonClickHandler}>
        {'Back'}
        </button>

        <button onClick={this.props.joinButtonClickHandler}>
        {'Join'}
        </button>

      </div>
      )};
}


export default PlayerEnterNameScreen;
