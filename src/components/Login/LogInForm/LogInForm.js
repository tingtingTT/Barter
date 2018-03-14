/*
Login form page for user. It will also direct user 
to sign up page if they have not register
*/
import React from 'react';
import classes from './LogInForm.css';
import { NavLink, withRouter } from 'react-router-dom';
import firebase from 'firebase';
import {connect} from 'react-redux';
class LogInForm extends React.Component {
  constructor(props){
      super(props);
      this.onLogin = this.onLogin.bind(this);
      this.signOut = this.signOut.bind(this);
  }
  signOut(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  onLogin(){
    var useremail = document.getElementById("usernameOrEmail");
    var password = document.getElementById("Lpassword");
    if(useremail.validity.valid &&
    password.validity.valid){

      var that = this;
      firebase.auth().signInWithEmailAndPassword(useremail.value, password.value).then(function(response) {
        //response returns User
        that.props.history.push('/');
        // DO MORE AUTH STUFF
        that.props.onLogin(firebase.auth().currentUser.email.replace(/\W/g, ''));
      
      }, function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/invalid-email'){
          useremail.value = "";
          alert(errorMessage);
        } else if (errorCode === 'auth/user-not-found'){
          useremail.value = "";
          alert(errorMessage);
        } else if (errorCode === 'auth/wrong-password'){
          password.value = "";
          alert(errorMessage);
        }
      });


    } else {
      alert("Invalid input!");
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
                Email address:
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
              <button id="login" className={classes.button} type="button" onClick={this.onLogin}>
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

const mapDispatchToProps = dispatch =>{
    return {
        onLogin: (email) => dispatch({type: 'LOGIN', val:email}),
    }
};

const mapStateToProps = state =>{
  return {
    userId: state.userId
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogInForm));
