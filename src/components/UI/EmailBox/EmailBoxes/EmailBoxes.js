import React from 'react';

import classes from './EmailBoxes.css'

const EmailBoxes = (props) => {
    console.log("activity log");
    return (
    <div className={classes.box}>
      {props.msg}
    <br/>
      {props.contactinfo}
    <br/>
      {props.item1}
    <br/>
      {props.item2}
      <br/>
        {/* <div className={classes.delete} onClick={props.clicked}>X</div>
        <h3 className={classes.mainText}>You <span className={classes.importantText}>{props.type}</span></h3>
        <h3 className={classes.mainText}>Contact <span className={classes.importantText}>{props.otherUsername} </span>to set up the exchange</h3>
        <h3><span className={classes.itemText}>{props.item1} </span><span className={classes.small}> for </span><span className={classes.itemText}>{props.item2}</span></h3>
        <a href={emailTo} className={classes.email}>{props.email}</a> */}
    </div>
    )
}

export default EmailBoxes;
