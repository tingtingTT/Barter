/* global gapi */
import React, { Component } from 'react';
import axios from 'axios';
import classes from './CreateAccount.css';
import { NavLink, withRouter } from 'react-router-dom';


class CreateAccount extends React.Component {
  constructor(props){
      super(props);
      this.signOut = this.signOut.bind(this);
      this.onSignIn = this.onSignIn.bind(this);
      this.onLogin = this.onLogin.bind(this);


      //this.signOut();
  }


  signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }


  componentDidMount() {
      console.log('this mounted');
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
      if(document.getElementById('Gusername').validity.valid){
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      this.props.history.push('/login');
      //AUTH
      } else {
        var user = prompt("You need a username along with your google email!");
        if(user != ""){
          //AUTH
        }
      }
  }

  onLogin(){
    if(document.getElementById("email").validity.valid &&
    document.getElementById("username").validity.valid &&
    document.getElementById("password").validity.valid){
          //AUTH GOES HERE ***
          this.props.history.push('/login');

    } else {
      document.getElementById("signin").click();
    }
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
                id="Gusername"
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
          <form id='NormalSignUp'> {/* change later to databaseinfo and router */}
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
                id="email"
                type="email"
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
            <button id='signin' className={classes.button} type="submit" onClick={this.onLogin}  >
                Sign up for Barter


              </button>
            </div>
          </form>
        </div>
      </div>
    )

  }

}

export default withRouter(CreateAccount);
