import React from 'react';

import classes from './InventoryItem.css'

const inventoryItem = (props) => (

    <div className={classes.Item}>
        <img src={props.img} />
        <p>{props.name}</p>
    </div>

);

export default inventoryItem;
