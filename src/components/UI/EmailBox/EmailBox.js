import React from 'react';

import classes from './EmailBox.css';


/*

PROPS:

won ===>                    True if user won an auction
otherUsername ===>          username of other party
item1 ===>                  item the user won || user's chosen winning bid
item2 ===>                  users winning bid || item user auctioned off
email ===>                  email address of other party
clicked ===>                action when x is clicked
*/ 
const emailBox = (props) => {
    let type = null;
    if(props.won){
        type = 'WON!!!';
    }
    else{
        type = 'CHOSE A WINNER';
    }
    let emailTo = "mailto:" + props.email;

    return (

        <div className={classes.box}>
            <div className={classes.delete} onClick={props.clicked}>X</div>
            <h3 className={classes.mainText}>You <span className={classes.importantText}>{type}</span></h3>
            <h3 className={classes.mainText}>Contact <span className={classes.importantText}>{props.otherUsername} </span>to set up the exchange</h3>
            <h3><span className={classes.itemText}>{props.item1} </span><span className={classes.small}> for </span><span className={classes.itemText}>{props.item2}</span></h3>
            <a href={emailTo} className={classes.email}>{props.email}</a>
        </div>

    );

}

export default emailBox;