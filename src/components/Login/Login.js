import React, { Component } from 'react';
import axios from 'axios';
import LogInForm from './LogInForm/LogInForm';
import classes from './Login.css';

class Login extends React.Component {

  render() {

    return (
            <div className={classes.Login}>
                <LogInForm title='Log in'/>
            </div>
    );
  }

}

export default Login;
