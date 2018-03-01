import React, {Component} from 'react';
import firebase, { auth, User } from 'firebase';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';

import {connect} from 'react-redux';


class NavigationItems extends Component {

    // logout function, pass it as a prop to logout button 
    logout = () => {
        auth().signOut().then(() => {
            this.props.onLogout();
        });}

    render(){

        return(

                <ul className={classes.NavigationItems}>
                    <NavigationItem show={this.props.userId === 'none'} link='/' >Home</NavigationItem>
                    <NavigationItem show={this.props.userId === 'none'} link='/login' >Login</NavigationItem>
                    {console.log(this.props.userId)}
                    <NavigationItem show={this.props.userId !== 'none'} link='/' >Home</NavigationItem>
                    <NavigationItem show={this.props.userId !== 'none'} link='/profile' >Profile</NavigationItem>
                    <NavigationItem clicked={this.logout} show={this.props.userId !== 'none'} link='/'>Logout
                    </NavigationItem>
                    
                </ul>
        );
    }

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


export default connect(mapStateToProps, mapDispatchToProps) (NavigationItems);

