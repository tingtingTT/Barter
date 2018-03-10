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
            snapshot.forEach(childsnapshot =>{
                noteLogs.push(childsnapshot.val());
            });
    
            // for (var i = 0; i < notificationlogs.length; i++){
            //     console.log(notificationlogs[i]);
            // }
            this.setState({notificationlogs: noteLogs});
            console.log("...");
            console.log(this.state.notificationlogs);
    
    
    
        });

        let contLogs = [];
        //THIS IS IMPORTANT FOR THE RIGHT SIDE NOTIFICATIONS
        userItems.child(name+'/').child('/log').child('/contacts').on('value', snapshot =>{
            snapshot.forEach(function(childNodes){
                contLogs.push(childNodes.val());
            });
    
            // for (var i = 0; i < contactinfologs.length; i++){
            //     console.log(contactinfologs[i]);
            // }
            
            this.setState({contactinfologs: contLogs});
            console.log(this.state.contactinfologs);
    
    
    
        });
    }
    
    render(){
        console.log('in render');
        console.log(this.state.notificationlogs);
  
        return (
            <Auxiliary>
                <div className={classes.banner}>
                    <h1>Notification Log</h1>
                </div>
                <div className={classes.container}>
                    <div className={classes.mainArea}>
                        <Log notifications={this.state.notificationlogs}/>
                    </div>
                    <div className={classes.sideArea}>
                        <EmailBox
                            won
                            otherUsername="Catlady225"
                            item1="Dollhouse"
                            item2="Tiger statue"
                            email="cats4ever@gmail.com"
                        />
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
