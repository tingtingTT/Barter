/*
Auction item on profile listing page
*/
import React from 'react';
import classes from './ListingItem.css'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';


const listingItem = (props) => (
    <div className={classes.Item}>
        <img src={props.img} className={classes.Image} alt=''/>
        <div> <FontAwesomeIcon icon={props.category} size="3x"/></div>
        <div className={classes.Textnum}>{props.bidcount}</div>
        <div className={classes.Textbid}> Bid </div>
        <div className={classes.Inside}>
            <div> <FontAwesomeIcon icon={props.category} size="3x"/></div>
            <div className={classes.Line}>{props.name}</div>
            <div className={classes.Line}>{props.bidcount} bids</div>
            <div className={classes.Button2} style={{bottom: "100px"}} onClick={props.clicked}><FontAwesomeIcon icon="edit"/></div>
            <div className={classes.Button2} key={props.key} onClick={props.delclicked}><FontAwesomeIcon icon="trash-alt"/></div>
        </div>
    </div>

);

export default listingItem;
