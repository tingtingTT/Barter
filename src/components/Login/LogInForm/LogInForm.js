import React, { Component } from 'react';
import axios from 'axios';
import classes from './LogInForm.css';
import { NavLink, withRouter } from 'react-router-dom';

class LogInForm extends React.Component {

  constructor(props){
      super(props);
      this.onLogin = this.onLogin.bind(this);
  }

  onLogin(){
    if(document.getElementById("usernameOrEmail").validity.valid &&
    document.getElementById("Lpassword").validity.valid){
          //AUTH GOES HERE ***
          this.props.history.push('/');

    } else {
      document.getElementById("login").click();
    }
  }


  render() {
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <h1>{this.props.title}</h1>
            <p className={classes.lead}>
              Log in with your Barter account.
            </p>
          <form > {/* change later to databaseinfo and router */}
            <div className={classes.formGroup}>
              <label className={classes.label} htmlFor="usernameOrEmail">
                Username or email address:
                <input
                  className={classes.input}
                  id="usernameOrEmail"
                  type="text"
                  name="usernameOrEmail"
                  autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                  required
                />
              </label>
            </div>
            <div className={classes.formGroup}>
              <label className={classes.label} htmlFor="password">
                Password:
                <input
                  className={classes.input}
                  id="Lpassword"
                  type="password"
                  name="password"
                  required
                />
              </label>
            </div>
            <div className={classes.formGroup}>
              <button id="login" className={classes.button} type="submit" onClick={this.onLogin}>
                Log in
              </button>
            </div>
          </form>
          <div className={classes.create}>
            <p> New to Barter
               <NavLink exact to="/join?source=login"> Create an account.</NavLink>

            </p>
          </div>
        </div>
       </div>
     )



  }

}

export default withRouter(LogInForm);
