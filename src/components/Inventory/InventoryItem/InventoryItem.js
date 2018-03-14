/*
Inventory item tile for user items for bidding
*/

import React from 'react';

import classes from './InventoryItem.css'

const inventoryItem = (props) => (

    <div className={classes.Item} onClick={props.clicked}>
        <img src={props.img} alt=''/>
        <p>{props.name}</p>
    </div>

);

export default inventoryItem;
