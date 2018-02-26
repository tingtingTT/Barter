import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import classes from './ListingItemHome.css';
import Button from '../../UI/Button/Button';

const listingItemHome = (props) => (

    <div className={classes.Item} onClick={props.clicked}>
        <img src={props.img} className={classes.Image} alt=''/>
        <div> <FontAwesomeIcon icon={props.category} size="3x"/></div>
        <div className={classes.Text}>{props.name}</div>
        <div className={classes.Inside}>
            <div> <FontAwesomeIcon icon={props.category} size="3x"/></div>
            <div className={classes.Text}>{props.name}</div>
            <div className={classes.Textnum}>0 </div>
            <div className={classes.Textbid}> Bid </div>
        </div>
    </div>

);

export default listingItemHome;
