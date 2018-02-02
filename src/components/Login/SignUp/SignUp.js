import React, { Component } from 'react';
import axios from 'axios';
import CreateAccount from './CreateAccount/CreateAccount';
import { Link } from 'react-router'

class SignUp extends React.Component {

  render() {

    return (
            <div>
                <CreateAccount title='Sign Up'/>
            </div>
    );
  }

}

export default SignUp;
