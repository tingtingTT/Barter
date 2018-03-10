import React from 'react';
import ActivityLog from './ActivityLog/ActivityLog';
import classes from './Log.css';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {database} from 'firebase';





const log = (props) => {
    console.log("props.");
    console.log(props.logs);
 
    var propLogs = [];
    props.logs.forEach(function(item){
        console.log("Item");
        console.log(item);
        propLogs.append(item);

    });
    console.log(propLogs);

    let activityLogs = (
        propLogs.map((log) => (
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
