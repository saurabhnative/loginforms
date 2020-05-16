import React from 'react'

function NumberInput(props) {
    return(
    <div className="form-group text-left">
    <label>{props.label}</label>
    <input type="text"
        pattern="[0-9]*"
        className="form-control"
        id={props.id}
        placeholder={props.placeholder}
        value={props.state}
        onChange={props.handleChange}
    />
    </div>
    );
}

export default NumberInput;