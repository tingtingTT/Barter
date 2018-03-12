/* Logs for users' activity. It will record the trade logs and 
user bidding logs
*/
import React from 'react';
import ActivityLog from './ActivityLog/ActivityLog';
import classes from './Log.css';


const log = (props) => {
    let activityLogs = (
        props.notifications.map((log) => (
                <ActivityLog
                key={log.key}
                user={log.user}
                date={log.date}
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


export default log;
