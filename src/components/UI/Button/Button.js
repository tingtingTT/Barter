/* Universal button
*/
import React from 'react';
import classnames from 'classnames';
import classes from './Button.css';

const button = (props) => (
    <button
        className={classnames( classes.Button, classes[props.position])}
        onClick={props.clicked}>
        {props.label}
    </button>
);

export default button;
