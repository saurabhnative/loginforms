import React, { Component } from 'react'

class SubmitButton extends Component{
  
  state = {
    isButtonDisabled: false
  }
  
  constructor (props) {
    super(props);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleSubmitClick (event) {
    event.preventDefault();
    this.setState({
        isButtonDisabled: true
    });

    // **** button will be disabled for  7 seconds after click ****
    setTimeout(() => this.setState({ isButtonDisabled: false }), 2000);

    return this.props.handleSubmitClick();

  }

  render () {
    return(
      <button 
        type="submit" 
        className="btn btn-primary"
        onClick={this.handleSubmitClick}
        disabled={this.state.isButtonDisabled}
        >
        {this.props.buttonText}
      </button>
    );
  }

} //class

export default SubmitButton