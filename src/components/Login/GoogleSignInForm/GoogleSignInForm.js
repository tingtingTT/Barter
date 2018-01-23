/* global gapi */
import React, { Component } from 'react';
import axios from 'axios';
import classes from './GoogleSignInForm.css';

var googleUser = {};

class GoogleSignInForm extends React.Component {

  constructor(props){
      super(props);
      this.onSignIn = this.onSignIn.bind(this)
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


  onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
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
          <form method="post"> {/* change later to databaseinfo and router */}
            <div className={classes.formGroup}>
              <label className={classes.label} htmlFor="usernameOrEmail">
                Username or email address:
                <input
                  className={classes.input}
                  id="usernameOrEmail"
                  type="text"
                  name="usernameOrEmail"
                  autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                />
              </label>
            </div>
            <div className={classes.formGroup}>
              <label className={classes.label} htmlFor="password">
                Password:
                <input
                  className={classes.input}
                  id="password"
                  type="password"
                  name="password"
                />
              </label>
            </div>
            <div className={classes.formGroup}>
              <button className={classes.button} type="submit">
                Log in
              </button>
            </div>
          </form>
       </div>
       </div>
     )



  }

}

export default GoogleSignInForm;
