import React from 'react';
import BidItem from './SelectBidList/SelectBidList';
import classes from './SelectBidChart.css';
import { withRouter } from 'react-router-dom';





const selectBidChart = (props) => {


    let bidItems = null
    var that = this;
    if(props.bidItems){
        bidItems = (
            props.bidItems.map((item, index) => (
                <BidItem key={index}
                    title={item.title}
                />
            ))
        );
    }
    return (
        <div className={classes.SelectBidChart}>
            <div className={classes.name}>Add Bid</div>
            <div className={classes.content}>{bidItems}</div>
            <div className={classes.bidbtn}>Bid Item(s)</div>
        </div>

    )
}


export default withRouter(selectBidChart);
