/*
Sign up form for user to create a new account
*/
import React from 'react';
import CreateAccount from './CreateAccount/CreateAccount';
import classes from './SignUp.css';
class SignUp extends React.Component {
  render() {
    return (
            <div className={classes.SignUp}>
                <CreateAccount title='Sign Up'/>
            </div>
    );
  }

}

export default SignUp;
