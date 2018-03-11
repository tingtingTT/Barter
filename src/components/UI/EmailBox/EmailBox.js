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
            <div>
                {emailBoxes}
            </div>

    )
}


export default EmailBox;
