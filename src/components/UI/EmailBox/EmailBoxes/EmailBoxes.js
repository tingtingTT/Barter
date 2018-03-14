import React from 'react';
import classes from './EmailBoxes.css'

const EmailBoxes = (props) => {

    let emailTo = 'mailto:' + props.contactinfo;
    return (
    <div className={classes.box}>
      <div className={classes.delete} onClick={props.clicked}>X</div>
      <h3 className={classes.mainText}> <span className={classes.importantText}>{props.msg}</span></h3>
      <h3 className={classes.mainText}>{props.contact}</h3>
      <h3><span className={classes.itemText}>{props.item1} </span><span className={classes.small}> for </span><span className={classes.itemText}>{props.item2}</span></h3>
      <a href={emailTo} className={classes.email}>{props.contactinfo}</a>
    </div>
    )
}

export default EmailBoxes;
