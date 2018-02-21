import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import classes from './ListingItemHome.css';
import Button from '../../UI/Button/Button';

const listingItemHome = (props) => (

    <div className={classes.Item} onClick={props.clicked}>
        <img src={props.img} className={classes.Image} alt=''/>
        <div className={classes.text}>{props.category || "None"}</div>
        <p> {props.name} </p>
        <div className={classes.Inside}>
        <div> <FontAwesomeIcon icon="gamepad" size="6x"/></div>
            <div className={classes.text}>{props.category || "None"}</div>
            <div className={classes.text}>{props.name}</div>
            <div className={classes.text}>0 </div>
            <div className={classes.text}> Bid </div>
        </div>
    </div>

);

export default listingItemHome;
