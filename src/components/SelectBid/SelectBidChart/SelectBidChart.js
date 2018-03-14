/*
Current list of items for user to choose to bid on other's item
*/
import React from 'react';
import BidItem from './SelectBidList/SelectBidList';
import classes from './SelectBidChart.css';
import { withRouter } from 'react-router-dom';

const selectBidChart = (props) => {
    let bidItems = null
    if(props.bidItems){
        bidItems = (
            props.bidItems.map((item, index) => (
                <BidItem key={item.itemKey}
                    title={item.itemName}
                    onSelected={() => props.setSelected(item.itemKey)}
                />
            ))
        );
    }
    return (
        <div className={classes.SelectBidChart}>
            <div className={classes.name}>Add Bid</div>
            <div className={classes.content}>{bidItems}</div>
            <div className={classes.bidbtn} onClick={props.addBid}>Bid Item(s)</div>
        </div>
    )
}


export default withRouter(selectBidChart);
