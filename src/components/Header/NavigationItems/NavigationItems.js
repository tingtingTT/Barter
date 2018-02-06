import React, {Component} from 'react';
import firebase, { auth } from 'firebase';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';

import {connect} from 'react-redux';


class NavigationItems extends Component {

    state = {
        userId: 'none'
    };

    componentDidUpdate(prevProps){
        console.log(prevProps.userId);
        console.log(this.state.userId);
        if(prevProps.userId !== this.props.userId){
            this.setState({userId: this.props.userId});
        }
    }
     
    render(){

        return(

                <ul className={classes.NavigationItems}>
                    <NavigationItem show={this.state.userId === 'none'} link='/' >Home</NavigationItem>
                    <NavigationItem show={this.state.userId === 'none'} link='/profile' >Profile</NavigationItem>
                    <NavigationItem show={this.state.userId === 'none'} link='/login' >Login</NavigationItem>
                    {console.log(this.state.userId)}
                    <NavigationItem show={this.state.userId !== 'none'} link='/' >Home</NavigationItem>
                    <NavigationItem show={this.state.userId !== 'none'} link='/profile' >Profile</NavigationItem>
                    <NavigationItem show={this.state.userId !== 'none'} link='/'>Log Out
                    </NavigationItem>
                    
                </ul>
        );
    }

}


const mapStateToProps = state => {
    return {
        userId: state.userId
    }
}


export default connect(mapStateToProps) (NavigationItems);

