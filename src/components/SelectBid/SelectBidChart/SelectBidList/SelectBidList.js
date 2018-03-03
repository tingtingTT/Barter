import React from 'react';

import classes from './SelectBidList.css'

import { withRouter } from 'react-router-dom';

const selctBidList = (props) => (

    <div className={classes.SelectBidList}>
        <div className={classes.textBorder}>{props.title}</div>
    </div>

);

export default withRouter(selctBidList);
