/*
Button for item seller to choose a winner
*/
import React, { Component } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import classes from './WinningBidButton.css';

const WinningBidButton = (props) => {
  return (
    <button id="WinnerButton" className={classes.button} type="button" onClick={props.onClick}>
      Choose Winner
    </button>
    )
}

export default withRouter(WinningBidButton);
