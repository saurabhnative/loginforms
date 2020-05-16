import React from 'react'

function SubmitButton(props){
    return(
        <button 
        type="submit" 
        className="btn btn-primary"
        onClick={props.handleSubmitClick}
        >
        {props.buttonText}
      </button>
    );
}

export default SubmitButton