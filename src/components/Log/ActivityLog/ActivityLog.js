import React from 'react';

import classes from './ActivityLog.css'

var lObj = [{
  user: 'YOU',
  date: 'oct3',
  action1: '',
  item1: 'Ended',
  item2: 'item'
}];
const activityLog = (props) => {
    return(
        <div className={classes.ActivityLog}>
            <div className={classes.textnBorder}>
                {props.user}
                {props.action1}
                {props.item1}
                {props.item2}
                <div className={classes.date}>{props.date}</div>
            </div>
        </div>
    )
}

export default activityLog;
