
/*
List of inventory items fro user to bid on
*/

import React from 'react';
import InventoryItem from './InventoryItem/InventoryItem';

import classes from './Inventory.css';

const inventory = (props) => {
   
    let inventoryItems = null
    if(props.inventory){
        inventoryItems = (
            props.inventory.map((item, index) => (
                <InventoryItem key={index}
                    img={item.imageURL}
                    name={item.itemName}
                    desc={item.desc}
                    clicked={() => props.editItemHandler(index)}
                />
            ))
        );
    }
    
    
    return (
        <div className={classes.Inventory}>
            {inventoryItems}

        </div>
        
    )
}
    
    
export default inventory;
