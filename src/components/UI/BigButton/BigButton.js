/* Universal bid button
*/
import React from 'react';
import classes from './BigButton.css';

const bigButton = (props) => (
    <div className={classes.button2}>
        <h2 className={classes.font}>{props.text}</h2>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>

);

export default bigButton;