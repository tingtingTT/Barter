import React from 'react';
import ActivityLog from './ActivityLog/ActivityLog';
import classes from './Log.css';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {database} from 'firebase';





const log = (props) => {
    console.log("props.");
    console.log(props.notifications);

    var logs = [{activity: 'AAA bid on BBB with CCC', date: '3/2/18'}, {activity: 'BBB bid on CCC with AAA', date: '3/3/18'}, {activity: 'BBB bid on CCC with AAA', date: '3/3/18'},{activity: 'BBB bid on CCC with AAA', date: '3/3/18'}];

    let activityLogs = (
        props.notifications.map((log) => (
                <ActivityLog
                key={log.key}
                user={log.action1}
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
