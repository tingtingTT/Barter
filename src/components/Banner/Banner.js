/*
Banner for home page. It reminds user to sign up if they have not done so
*/
import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import { auth } from 'firebase';
import BigButton from '../UI/BigButton/BigButton';
import {connect} from 'react-redux';
import classes from './Banner.css'
class Banner extends Component{
    // logout function, pass it as a prop to logout button 
    logout = () => {
        auth().signOut().then(() => {
            this.props.onLogout();
        });}

    render(){
        var LoggedIn = false;
        if(this.props.userId === 'none'){
            LoggedIn = false;
        }
        else{
            LoggedIn = true;
        }
        let banner = (
            
            <div className={classes.Banner}>
                <div className={classes.joinText}>
                    <h1 className={classes.title}> Join Barter</h1>
                    <h3 className={classes.font}>Join the community that's changing how we trade goods.</h3>
                </div>
                <NavLink exact to="/join?source=login">
                    <BigButton text="Sign-Up" />    
                </NavLink>
            </div>
        );

        if (LoggedIn) {
            banner = (
                <div className={classes.Banner}>
                    <div className={classes.logo}>
                        <img src="https://i.imgur.com/7AgYdWZ.png" alt="Barter Logo" />
                    </div>
                </div>
            );
        }
        return (
            <div>
                {banner}
            </div>
        );}
}

const mapDispatchToProps = dispatch =>{
    return {
        onLogout: () => dispatch({type: 'LOGOUT'}),
    }
};

const mapStateToProps = state => {
    return {
        userId: state.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Banner);

