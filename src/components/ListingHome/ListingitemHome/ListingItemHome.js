import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { withRouter } from 'react-router-dom';

import classes from './ListingItemHome.css';
import Button from '../../UI/Button/Button';

const listingItemHome = (props) => {

    const openDetails = () => {
        const queryParams = [];
        for (let info in props){
            console.log(info);
            queryParams.push(encodeURIComponent(info) + '=' + encodeURIComponent(props[info]));
        }
        const queryString = queryParams.join('&');
        props.history.push({
            pathname: '/details',
            search: '?' + queryString
        });
    }

    return (

        <div className={classes.Item} onClick={props.clicked}>
        <img src={props.img} className={classes.Image} alt=''/>
        <p>{props.category || "None"}</p>
        <p> {props.name} </p>
        <div className={classes.Inside} onClick={openDetails}>
            <div> <FontAwesomeIcon icon="gamepad" size="6x"/></div>
                <p>{props.category || "None"}</p>
                <p>{props.name}</p>
                <h2>Plcae Holder</h2>
                <p2>0 </p2>
                <p> Bid </p>
            </div>
        </div>
    );

}


export default withRouter(listingItemHome);
