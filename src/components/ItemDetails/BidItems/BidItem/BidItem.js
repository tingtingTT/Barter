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

const bidItem = (props) => {
    console.log(props.isNew);

    return(
        <div className={classes.BidItem}>
        {props.isNew
            ? <div className={classes.rowIcon}>
                {props.owner}
                <div className={classes.mapIcon}><FontAwesomeIcon icon="map-marker" size="1x"/></div>
                {props.zipcode}
                { isOwner(props.itemOwner) ? <WinningBidButton onClick={props.onClick}/> : null }
            </div>
            : null
        }
            
            <div className={classes.textnBorder}>{props.title}</div>
        </div>
    )
}

export default withRouter(bidItem);
