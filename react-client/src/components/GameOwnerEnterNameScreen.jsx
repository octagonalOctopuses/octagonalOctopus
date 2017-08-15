import React from 'react';

class GameOwnerEnterNameScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nameFormValue: '',
    }

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({nameFormValue: event.target.value});
  }

  render() {

    return (
      <div>

        <h2> Please Enter your Name </h2>

        I do not presently know how to deal with the html form

        <form >
        <input
      type="text"
      name="Name"
      value={this.state.accessCodeFormValue}
      onChange={this.handleAccessCodeChange}
        />

        <input type="submit" value="Submit"/>
        </form>

        <button onClick={this.props.backButtonClickHandler}>
        {'Back'}
        </button>

     </div>
    )}
}

export default GameOwnerEnterNameScreen;
