import React, { Component } from 'react';
import axios from 'axios';
import LogInForm from './LogInForm/LogInForm';

class Login extends React.Component {

  render() {

    return (
            <div>
                <LogInForm title='Log in'/>
            </div>
    );
  }

}

export default Login;
