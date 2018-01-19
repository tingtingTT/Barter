import React from 'react';

import classes from './Button.css';

const button = (props) => (
    <div
        className={classes.Button}
        onClick={props.clicked}>
        <p>{props.label}</p>
    </div>
);

export default button;
