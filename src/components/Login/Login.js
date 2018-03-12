/* Login page for user. If user has registered before, it will confirm user info in Firebase.
If user has not signed up, it will take user to the sign up page
*/ 
import React from 'react';
import LogInForm from './LogInForm/LogInForm';
import classes from './Login.css';

class Login extends React.Component {

  render() {
    return (
      <div className={classes.content}>
          <LogInForm title='Log in'/>
      </div>
    );
  }
}

export default Login;
