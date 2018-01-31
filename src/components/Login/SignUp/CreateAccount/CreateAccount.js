/* global gapi */
import React, { Component } from 'react';
import axios from 'axios';
import classes from './CreateAccount.css';
import { NavLink } from 'react-router-dom';


class CreateAccount extends React.Component {
  constructor(props){
      super(props);
      this.onSignIn = this.onSignIn.bind(this)
  }

/*  validateGoogleSignIn() {
    var x = document.forms["GoogleSignUp"]["Gusername"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
  }*/

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

  render(){
    return(
      <div className={classes.root}>
        <div className={classes.container}>
          <h1>{this.props.title}</h1>
          <p className={classes.lead}>
            Sign up with Google: Choose a username and sign in.
          </p>
          <form name="GoogleSignUp">
          <div className={classes.formGroup}>
            <label className={classes.label} htmlFor="username">
              Username:
              <input
                className={classes.input}
                id="username"
                type="text"
                name="Gusername"
                placeholder="Pick a username"
                autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                required // NOT WORKING - FIND FIX **********
              />
            </label>
          </div>
          <div id='my-signin2' className={classes.formGroup}>
         </div>
       </form>
          <strong className={classes.lineThrough}>OR</strong>
          <form method="post"> {/* change later to databaseinfo and router */}
          <div className={classes.formGroup}>
            <label className={classes.label} htmlFor="username">
              Username:
              <input
                className={classes.input}
                id="username"
                type="text"
                name="username"
                placeholder="Pick a username"
                autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                required
              />
            </label>
          </div>
          <div className={classes.formGroup}>
            <label className={classes.label} htmlFor="Email">
              Email address:
              <input
                className={classes.input}
                id="Email"
                type="text"
                name="Email"
                placeholder="you@example.com"
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
                id="password"
                type="password"
                name="password"
                placeholder="Create a password"
                required
              />
            </label>
          </div>
          <div className={classes.formGroup}>
            <button className={classes.button} type="submit">
                Sign up for Barter

              </button>
            </div>
          </form>
        </div>
      </div>
    )

  }

}

export default CreateAccount;
