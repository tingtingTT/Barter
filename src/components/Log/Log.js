import React from 'react';
import ActivityLog from './ActivityLog/ActivityLog';
import classes from './Log.css';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {database} from 'firebase';





const log = (props) => {
    //var logs = [{activity: 'AAA bid on BBB with CCC', date: '3/2/18'}, {activity: 'BBB bid on CCC with AAA', date: '3/3/18'}, {activity: 'BBB bid on CCC with AAA', date: '3/3/18'},{activity: 'BBB bid on CCC with AAA', date: '3/3/18'}];
    var notificationlogs = [];
    firebase.database().ref("/userItems/" + props.userId + '/log/notifications/').on('value', function(snap){
        snap.forEach(function(childNodes){
            notificationlogs.push(childNodes.val());
        });

        console.log("LOG NOTS)");
        console.log(notificationlogs);
        // for (var i = 0; i < notificationlogs.length; i++){
        //     console.log(notificationlogs[i]);
        // }



    });


    var logs = [{
      user: 'YOU',
      date: 'oct2',
      action1: '',
      item1: 'Ended',
      item2: 'bob'
    }];
    console.log("Here");
    console.log(notificationlogs);
    let activityLogs = (
        notificationlogs.map((log) => (
                <ActivityLog
                user={log.user}
                date={log[0].date}
                action1 = {log.action1}
                item1 = {log.item1}
                item2 = {log.item2}
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

const mapStateToProps = state => {
    return {
        userId: state.userId
    }
}

export default connect(mapStateToProps)  (log);
