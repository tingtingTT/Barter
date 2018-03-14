/* Navigation to different main component of the web app
*/
import React, { Component } from 'react';
import s from './Navigation.css';

class Navigation extends React.Component {
  render() {
    return (
      <div className={s.root} role="navigation">
        <div className={s.link} to="/about">
          About
        </div>
        <div className={s.link} to="/contact">
          Contact
        </div>
        <span className={s.spacer}> | </span>
        <div className={s.link} to="/login">
          Log in
        </div>
      </div>
    );
  }
}

export default Navigation;
