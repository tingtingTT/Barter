import React, { Component } from 'react';
import axios from 'axios';
import GoogleSignInForm from './GoogleSignInForm/GoogleSignInForm';

class Login extends React.Component {


  render() {
    return (
      <div>
        <GoogleSignInForm title='Log in' onClick={this.renderButton}/>
      </div>
    );
  }

}

export default Login;
