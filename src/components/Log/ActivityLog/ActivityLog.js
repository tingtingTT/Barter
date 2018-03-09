import React from 'react';

import classes from './ActivityLog.css'

const activityLog = (props) => {
    return(
        <div className={classes.ActivityLog}>
            <div className={classes.textnBorder}>
                {props.activity}
                <div className={classes.date}>{props.date}</div>
            </div>
        </div>
    )
}

export default activityLog;
