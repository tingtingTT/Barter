/* global gapi */
import React, { Component } from 'react';
import axios from 'axios';
import classes from './GoogleSignInForm.css';
import { NavLink, withRouter } from 'react-router-dom';

var googleUser = {};

class GoogleSignInForm extends React.Component {

  constructor(props){
      super(props);
      this.onSignIn = this.onSignIn.bind(this);
      this.onLogin = this.onLogin.bind(this);
      this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
      console.log('this mounted')
      gapi.signin2.render('my-signin2', {
          'scope': 'profile email',
          'width': '380',
          'height': 50,
          'longtitle': true,
          'theme': 'dark',
          'onsuccess': this.onSignIn,
      });
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

  signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }
  onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

      //AUTH
      //if (first time viist Login){
      // sign user outl
      // else {
      this.props.history.push('/');

  }

  render() {
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <h1>{this.props.title}</h1>
            <p className={classes.lead}>
              Log in with your google account.
            </p>
            {/* data-onsuccess={this.onSignIn} */}
            <div id='my-signin2' className={classes.formGroup}>
           </div>
         <strong className={classes.lineThrough}>OR</strong>
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
          <div className={classes.create} onClick={this.signOut}>
            <p> New to Barter
               {this.signOut}
               <NavLink exact to="/join?source=login"> Create an account.</NavLink>

            </p>
          </div>
        </div>
       </div>
     )



  }

}

export default withRouter(GoogleSignInForm);
