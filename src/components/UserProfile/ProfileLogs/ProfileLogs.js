import React, { Component } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {database} from 'firebase';
import classes from './ProfileLogs.css';

const ProfileLogs = (props) => {

var log = [];
firebase.database().ref("/userItems/" + props.userId + '/log/').on('value', function(snap){
   snap.forEach(function(childNodes){

       log.push(childNodes.val());
   });

   for (var i = 0; i < log.length; i++){
     console.log(log[i]);
   }

});





  return (
    <div className={classes.content}>
        <br/>
           {log.map(logs => <div className={classes.content}> {logs} </div>)}
  </div>

    )
}


const mapStateToProps = state => {
    return {
        userId: state.userId
    }
}

export default connect(mapStateToProps) (withRouter(ProfileLogs));
