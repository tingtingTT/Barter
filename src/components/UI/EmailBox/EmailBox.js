import React from 'react';
import EmailBoxes from './EmailBoxes/EmailBoxes';
import classes from './EmailBox.css';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {database} from 'firebase';





const EmailBox = (props) => {
    console.log("props.");
    console.log(props.notifications);

    var logs = [{activity: 'AAA bid on BBB with CCC', date: '3/2/18'}, {activity: 'BBB bid on CCC with AAA', date: '3/3/18'}, {activity: 'BBB bid on CCC with AAA', date: '3/3/18'},{activity: 'BBB bid on CCC with AAA', date: '3/3/18'}];

    let emailBoxes = (
        props.notifications.map((log) => (
                <EmailBoxes
                  msg = {log.msg}
                  contact = {log.contact}
                  item1 = {log.item1}
                  item2 = {log.item2}
                  contactinfo = {log.contactinfo}


            />

        ))
    );

    return (
        <div className={classes.box}>
            <div className={classes.mainText}>
            {emailBoxes}
            </div>
        </div>

    )
}


export default EmailBox;
