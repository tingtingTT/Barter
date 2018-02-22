import React from 'react';

import classes from './ListingItem.css'
import Button from '../../UI/Button/Button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';


const listingItem = (props) => (

    <div className={classes.Item} onClick={props.clicked}>
        <img src={props.img} className={classes.Image} alt=''/>
        <div> <FontAwesomeIcon icon="gamepad" size="3x"/></div>
        <div className={classes.Textnum}>0 </div>
        <div className={classes.Textbid}> Bid </div>
        <div className={classes.Inside}>
            <div> <FontAwesomeIcon icon="gamepad" size="3x"/></div>
            <div className={classes.Line}>{props.name}</div>
            <div className={classes.Line}>0 Bid</div>
            <div className={classes.Button2} style={{bottom: "100px"}}  onClick={props.clicked}>Edit</div>
            <div className={classes.Button2}>Delete</div>
        </div>
    </div>

);

export default listingItem;
