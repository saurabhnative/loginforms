import React from 'react'

function TextInput(props) {
    return(
    <div className="form-group text-left">
    <label>{props.label}</label>
    <input type="text"
        className="form-control"
        id={props.id}
        placeholder={props.placeholder}
        value={props.state}
        onChange={props.handleChange}
    />
    </div>
    );
}

export default TextInput;