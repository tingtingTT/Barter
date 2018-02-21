import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import BigButton from '../UI/BigButton/BigButton';

import classes from './Banner.css'
 
 // TODO: Get Logged in State from global state
const Banner = (props) => {

    const LoggedIn = true;

    let banner = (
        
        <div className={classes.Banner}>
            <div className={classes.joinText}>
                <h1 className={classes.title}> Join Barter</h1>
                <h3 className={classes.font}>Join the community that's changing how we trade goods.</h3>
            </div>
            <NavLink exact to="/join?source=login">
                <BigButton text="Sign-Up" />    
            </NavLink>
            

        </div>
    );

    if (LoggedIn) {
        banner = (
            <div className={classes.Banner}>
                <div className={classes.logo}>
                    <img src="https://i.imgur.com/7AgYdWZ.png" alt="Barter Logo" />
                </div>
            </div>
        );
    }
  
    return (
        <div>
            {banner}
        </div>
    );
  
}
export default Banner;