import React, { Component } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {database} from 'firebase';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import EmailBox from '../UI/EmailBox/EmailBox';
import Log from './Log/Log';

import classes from './ProfileLogs.css';

const ProfileLogs = (props) => {

    var notificationlogs = [];
    var contactinfologs = [];

    let myLogs = [];
    firebase.database().ref("/userItems/" + props.userId + '/log/notifications/').on('value', function(snap){
        snap.forEach(function(childNodes){
            notificationlogs.push(childNodes.val());
        });

        // for (var i = 0; i < notificationlogs.length; i++){
        //     console.log(notificationlogs[i]);
        // }
        console.log("...");
        console.log(notificationlogs);



    });
    //THIS IS IMPORTANT FOR THE RIGHT SIDE NOTIFICATIONS
    firebase.database().ref("/userItems/" + props.userId + '/log/contacts/').on('value', function(snap){
        snap.forEach(function(childNodes){
            contactinfologs.push(childNodes.val());
        });

        // for (var i = 0; i < contactinfologs.length; i++){
        //     console.log(contactinfologs[i]);
        // }
        console.log(contactinfologs);



    });


  return (
        <Auxiliary>
            <div className={classes.banner}>
                <h1>Notification Log</h1>
            </div>
            <div className={classes.container}>
                <div className={classes.mainArea}>
                    LIST OF LOGS HERE
                    <Log>{notificationlogs}</Log>
                </div>
                <div className={classes.sideArea}>
                    <EmailBox
                        won
                        otherUsername="Catlady225"
                        item1="Dollhouse"
                        item2="Tiger statue"
                        email="cats4ever@gmail.com"
                    />
                </div>

            </div>

        </Auxiliary>


    );
}


const mapStateToProps = state => {
    return {
        userId: state.userId
    }
}

export default connect(mapStateToProps) (withRouter(ProfileLogs));
