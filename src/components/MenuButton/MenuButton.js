import React from 'react';
import Button from 'react-bootstrap/Button'

function MenuButton(props){
    return(
        <Button variant="primary" size="lg" block onClick={props.handle}>
            {props.btnText}
        </Button>
    )
}

export default MenuButton;
