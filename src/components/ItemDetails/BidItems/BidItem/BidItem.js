import React from 'react';

import classes from './BidItem.css'

import FontAwesomeIcon from '@fortawesome/react-fontawesome';


const bidItem = (props) => (

    <div className={classes.BidItem}>
        <div className={classes.rowIcon}>
            <div className={classes.userIcon}></div>
            <div className={classes.mapIcon}><FontAwesomeIcon icon="map-marker" size="1x"/></div>
            {props.zipcode} 
            </div>
        <div className={classes.textnBorder}>{props.title}</div>
    </div>

);

export default bidItem;
