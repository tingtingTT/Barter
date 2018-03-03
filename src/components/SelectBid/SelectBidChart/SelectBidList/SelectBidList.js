import React from 'react';

import classes from './SelectBidList.css'

import { withRouter } from 'react-router-dom';

const selctBidList = (props) => (

    <div className={classes.SelectBidList}>
        <div className={classes.textBorder}>
            <label className={classes.container}><input type="checkbox" style={{background: 'hotpink'}}/>
            <span className={classes.checkmark}></span>{props.title}</label>
        </div>
    </div>

);

export default withRouter(selctBidList);
