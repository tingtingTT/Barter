import React, { Component } from 'react';

import BigButton from '../UI/BigButton/BigButton';

import classes from './Banner.css'
 
 
class Banner extends Component {
  render() {
    return (
        <div>
            <div className={classes.Banner}>
                <div className={classes.joinText}>
                    <h1 className={classes.title}> Join Barter</h1>
                    <h3 className={classes.font}>Join the community that's changing how we trade goods.</h3>
                </div>
                <BigButton text="Sign-Up" />    

            </div>
        </div>
    );
  }
}
export default Banner;