/* Log page for current user. It will show all relative logs for current user and
if nay bidding is successful, it will show contact intfo in the contact box
*/
import React, { Component } from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import EmailBox from '../UI/EmailBox/EmailBox';
import Log from './Log/Log';
import classes from './ProfileLogs.css';

const config = {
    apiKey: "AIzaSyDfRWLuvzYmSV3TwmLOppZT0ZZbtIZRlrs",
    authDomain: "barterbuddy-4b41a.firebaseapp.com",
    databaseURL: "https://barterbuddy-4b41a.firebaseio.com",
    projectId: "barterbuddy-4b41a",
    storageBucket: "barterbuddy-4b41a.appspot.com",
    messagingSenderId: "879139739414"

};

let fb = firebase.initializeApp(config, 'profileLog');
let userItems = fb.database().ref('userItems/');

class ProfileLogs extends Component {
    state = {
        notificationlogs: [],
        contactinfologs: [],
        myLogs: [],
        currentUser: ''
    };
    componentDidMount(){
        this.setState({currentUser: this.props.userId});
        let name = this.props.userId;
        let noteLogs = [];
        userItems.child(name+'/').child('/log').child('/notifications').on('value', snapshot =>{
            // let logs = snapshot.val();
            let index = 0;
            snapshot.forEach(childsnapshot =>{
                noteLogs.push(childsnapshot.val());
                noteLogs[index].key = childsnapshot.key;
                index ++;
            });

            this.setState({notificationlogs: noteLogs});
        });

        let contLogs = [];
        //THIS IS IMPORTANT FOR THE RIGHT SIDE NOTIFICATIONS
        userItems.child(name+'/').child('/log').child('/contacts').on('value', snapshot =>{
            let index = 0;
            snapshot.forEach(childsnapshot =>{
                contLogs.push(childsnapshot.val());
                contLogs[index].key = childsnapshot.key;
                index ++;
            });
            this.setState({contactinfologs: contLogs});
        });
    }

    deleteContactLog = (logKey) => {
        let ref = userItems.child(this.state.currentUser+'/').child('/log').child('/contacts');
        ref.child(logKey + '/').remove();

        let contLogs = [];
        //THIS IS IMPORTANT FOR THE RIGHT SIDE NOTIFICATIONS
        userItems.child(this.state.currentUser+'/').child('/log').child('/contacts').on('value', snapshot =>{
            let index = 0;
            snapshot.forEach(childsnapshot =>{
                contLogs.push(childsnapshot.val());
                contLogs[index].key = childsnapshot.key;
                index ++;
            });
            this.setState({contactinfologs: contLogs});
        });


    }

    render(){
        return (
            <Auxiliary>
                <div className={classes.banner}>
                    <h1 className={classes.notificationBanner}>Notification Log</h1>
                </div>
                <div className={classes.container}>
                    <div className={classes.mainArea}>
                        <Log notifications={this.state.notificationlogs}/>
                    </div>
                    <div className={classes.sideArea}>
                        <EmailBox notifications = {this.state.contactinfologs.reverse()} clicked={this.deleteContactLog} />
                    </div>
                </div>
            </Auxiliary>
        );
    }
}


const mapStateToProps = state => {
    return {
        userId: state.userId
    }
}

export default connect(mapStateToProps) (withRouter(ProfileLogs));
