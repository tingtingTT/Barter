import React, { Component } from 'react';
import axios from 'axios';
import classes from './CreateAccount.css';
import { NavLink } from 'react-router-dom';


class CreateAccount extends React.Component {

  render(){
    return(
      <div className={classes.root}>
        <div className={classes.container}>
          <h1>{this.props.title}</h1>
          <p className={classes.lead}>
            Sign up with Google: Choose a username and sign in.
          </p>
          <div className={classes.formGroup}>
            <label className={classes.label} htmlFor="username">
              Username:
              <input
                className={classes.input}
                id="username"
                type="text"
                name="username"
                placeholder="Username associated with Google"
                autoFocus // eslint-disable-line jsx-a11y/no-autofocus
              />
            </label>
          </div>
          *GOOGLE BUTTON HERE*
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
