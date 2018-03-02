import React from 'react';

import classes from './BidItem.css'

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import WinningBidButton from '../../WinningBidButton/WinningBidButton';
import { withRouter } from 'react-router-dom';

function isOwner(owner){
  console.log("isowner");
  console.log(owner);
  //console.log(this.props.userId);
  if ('PennyMonster38' === owner){
    return true;
  }
  return false;
}

const bidItem = (props) => (

    <div className={classes.BidItem}>
        <div className={classes.rowIcon}>
            <div className={classes.userIcon}></div>
            <div className={classes.mapIcon}><FontAwesomeIcon icon="map-marker" size="1x"/></div>
            {props.zipcode}
            { isOwner(props.itemOwner) ? <WinningBidButton onClick={props.onClick}/> : null }
            </div>
        <div className={classes.textnBorder}>{props.title}</div>
    </div>

);

export default withRouter(bidItem);
