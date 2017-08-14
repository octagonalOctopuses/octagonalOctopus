import React from 'react';

class GameOwnerEnterNameScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

        <h2> Please Enter your Name </h2>

      I do not presently know how to deal with the html form

     
<form >
  <input type="text" name="Name" value="Enter name"/>

  <input type="submit" value="Submit"/>
</form> 

        <button onClick={this.props.createButtonClickHandler}>
        {'Create'}
        </button>

        <button onClick={this.props.backButtonClickHandler}>
        {'Back'}
        </button>


 

      
     </div> 
    )
  }
  
}

export default GameOwnerEnterNameScreen;
