import React from 'react';
import ActivityLog from './ActivityLog/ActivityLog';
import classes from './Log.css';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {database} from 'firebase';





const log = (props) => {

    var notificationlogs = [];
    var contactinfologs = [];

    let myLogs = [];
    firebase.database().ref("/userItems/" + props.userId + '/log/notifications/').on('value', function(snap){
        snap.forEach(function(childNodes){
            console.log(childNodes.val);
            notificationlogs.push(childNodes.val());
        });

        // for (var i = 0; i < notificationlogs.length; i++){
        //     console.log(notificationlogs[i]);
        // }
        console.log(props.id);
        console.log(notificationlogs);



    });
    // console.log("props.");
    // console.log(props.logs);
 
    // var propLogs = [];
    // props.logs.forEach(item => {
    //     console.log("Item");
    //     console.log(item);
    //     propLogs.append(item);

    // });
    // console.log(propLogs);

    let activityLogs = (
        notificationlogs.map((log) => (
                <ActivityLog
                user={log.activity}
                date={log.date}
                // action1 = {log.action1}
                // item1 = {log.item1}
                // item2 = {log.item2}
            />

        ))
    );

    return (
        <div className={classes.Log}>
            <div className={classes.content}>
            {activityLogs}
            </div>
        </div>

    )
}


export default log;
