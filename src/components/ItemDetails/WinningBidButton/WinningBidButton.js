/*
Button for item seller to choose a winner
*/
import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './WinningBidButton.css';

const WinningBidButton = (props) => {
  return (
    <button id="WinnerButton" className={classes.button} type="button" onClick={props.onClick}>
      Choose Winner
    </button>
    )
}

export default withRouter(WinningBidButton);
