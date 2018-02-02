import React, { Component } from 'react';
import axios from 'axios';
import classes from './CreateAccount.css';
import { NavLink, withRouter } from 'react-router-dom';
import firebase, {database} from 'firebase';


class CreateAccount extends React.Component {
  constructor(props){
      super(props);;
      this.onLogin = this.onLogin.bind(this);


      //this.signOut();
  }

  createUser(){
    //INPUT USER INFO INTO database
    //CALL THIS FUNCTION IN onLogin
  }
  onLogin(){
    var email = document.getElementById("email"); // use email.value to get vals
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var zipcode = document.getElementById("zipcode");

    if(email.validity.valid && username.validity.valid &&
    password.validity.valid && zipcode.validity.valid){
      var isSuccessful = "true";
      firebase.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if(errorCode === 'auth/email-already-in-use'){
          email.value = "";
          /*this.email.value = "";
          document.getElementById("signin").click(); */
          isSuccessful = "false";
          alert(errorMessage);
          console.log(errorCode);
          console.log(isSuccessful);

        }
        console.log(errorCode);
        console.log(errorMessage);
        // ...
        });

        console.log(isSuccessful);
        if (isSuccessful === "true"){
          console.log(isSuccessful);
          //PUT CODE HERE FOR createUser()
          this.props.history.push('/login');

        }
      } else {
        alert("Invalid input!");
      }
  }



  render(){
    return(
      <div className={classes.root}>
        <div className={classes.container}>
          <h1>{this.props.title}</h1>
          <p className={classes.lead}>
            Create an account with Barter.
          </p>
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
                pattern=".{6,}"
                placeholder="Create a password"
                required
              />
            </label>
            Use atleast six characters.
          </div>
          <div className={classes.formGroup}>
            <label className={classes.label} htmlFor="zipcode">
              Zipcode:
              <input
                className={classes.input}
                id="zipcode"
                type="text"
                pattern="[0-9]{5}"
                name="zipcode"
                placeholder="Enter your zipcode"
                required
              />
            </label>
            Enter a 5 digit zipcode.
          </div>
          <div className={classes.formGroup}>
            <button id='signin' className={classes.button} type="button" onClick={this.onLogin}>
                Sign up for Barter
              </button>
            </div>
          </form>
          <div className={classes.terms}>
            <p> By signing up you agree to our
               <NavLink exact to="/terms"> terms of service.</NavLink>

            </p>
          </div>
        </div>
      </div>
    )

  }

}

export default withRouter(CreateAccount);
