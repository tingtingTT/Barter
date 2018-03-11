import React, { Component } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {database} from 'firebase';

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
            let logs = snapshot.val();
            let index = 0;
            snapshot.forEach(childsnapshot =>{
                console.log(childsnapshot);
                noteLogs.push(childsnapshot.val());
                noteLogs[index].key = childsnapshot.key;
                index ++;
            });

         
            this.setState({notificationlogs: noteLogs});
            console.log("...");
            console.log(this.state.notificationlogs);



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

            // for (var i = 0; i < contactinfologs.length; i++){
            //     console.log(contactinfologs[i]);
            // }

            this.setState({contactinfologs: contLogs});
            console.log(this.state.contactinfologs);



        });
    }
    // var oObjC = {
    //   msg: 'You chose a winner!',
    //   contact: oContactS,
    //   item1: auction.name,
    //   item2: itemString,
    //   contactinfo: bidderemail
    // };
    render(){
        console.log('in render');
        console.log(this.state.notificationlogs);

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
                        <EmailBox notifications = {this.state.contactinfologs.reverse()} />
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
