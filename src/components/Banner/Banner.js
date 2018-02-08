import React, { Component } from 'react';
import classes from './Banner.css'


class Banner extends Component {
  render() {
    return (
        <div>
            <div className={classes.Banner}>
                <div>
                    <h1 className={classes.font}>Barter</h1>
                    <h3 className={classes.font}> An online platform for facilitating the exchange of good </h3>
                </div>
                <div className={classes.basic}>
                    <h2 className={classes.font}>Sign-Up</h2>
                </div>
            </div>
        </div>
    );
  }
}

export default Banner;
