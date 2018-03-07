import React from 'react';

import classes from './BidItem.css'

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import WinningBidButton from '../../WinningBidButton/WinningBidButton';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

function isOwner(owner,loggeduser){
  //console.log("isowner");
  //console.log(owner);
  //console.log(loggeduser);
  if (loggeduser === owner){
    return true;
  }
  return false;
  //return true;
}

const bidItem = (props) => {
    //console.log(props.isNew);

    return(
        <div className={classes.BidItem}>
        {props.isNew
            ? <div className={classes.rowIcon}>
                {props.owner}
                <div className={classes.mapIcon}><FontAwesomeIcon icon="map-marker" size="1x"/></div>
                {props.zipcode}
                { isOwner(props.itemOwner,props.userId) ? <WinningBidButton onClick={() => props.onClick(props.itemOwner)}/> : null }
            </div>
            : null
        }

            <div className={classes.textnBorder}>{props.title}</div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        userId: state.userId
    }
}

export default connect(mapStateToProps) (withRouter(bidItem));
