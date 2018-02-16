import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import classes from './ListingItemHome.css';
import Button from '../../UI/Button/Button';

const listingItemHome = (props) => (

    <div className={classes.Item} onClick={props.clicked}>
        <img src={props.img} className={classes.Image} alt=''/>
        <p>{props.category || "None"}</p>
        <p> {props.name} </p>
        <div className={classes.Inside}>
        <div> <FontAwesomeIcon icon="gamepad" size="6x"/></div>
            <p>{props.category || "None"}</p>
            <p>{props.name}</p>
            <h2>Plcae Holder</h2>
            <p2>0 </p2>
            <p> Bid</p>
        </div>
    </div>

);

export default listingItemHome;
