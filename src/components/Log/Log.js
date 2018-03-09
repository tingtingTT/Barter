import React from 'react';
import ActivityLog from './ActivityLog/ActivityLog';
import classes from './Log.css';





const log = (props) => {
    var logs = [{activity: 'AAA bid on BBB with CCC', date: '3/2/18'}, {activity: 'BBB bid on CCC with AAA', date: '3/3/18'}, {activity: 'BBB bid on CCC with AAA', date: '3/3/18'},{activity: 'BBB bid on CCC with AAA', date: '3/3/18'}];
    let activityLogs = (
        logs.map((log) => (
                <ActivityLog
                activity={log.activity}
                date = {log.date}
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
