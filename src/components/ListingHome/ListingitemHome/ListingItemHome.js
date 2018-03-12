/*
Home page item tile
*/
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import classes from './ListingItemHome.css';

const listingItemHome = (props) => {
    const openDetails = () => {
        const queryParams = [];
        for (let info in props){
            queryParams.push(encodeURIComponent(info) + '=' + encodeURIComponent(props[info]));
        }
        const queryString = queryParams.join('&');
        props.history.push({
            pathname: '/details',
            search: '?' + queryString
        });
    }

    return (
        <div className={classes.Item} onClick={props.clicked}>
        <img src={props.img} className={classes.Image} alt=''/>
        <div> <FontAwesomeIcon icon={props.category} size="3x"/></div>
        <div className={classes.Text}>{props.name}</div>
        <div className={classes.Inside} onClick={openDetails}>
            <div> <FontAwesomeIcon icon={props.category} size="3x"/></div>
            <div className={classes.Text}>{props.name}</div>
            <div className={classes.Textnum}>{props.bidcount} </div>
            <div className={classes.Textbid}> Bid </div>
        </div>
        </div>
    );
}
export default withRouter(listingItemHome);
