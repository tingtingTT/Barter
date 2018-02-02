//Haven't tested any of this but it should be legit

//The a list component for each item in user inventory
// expected props:
/*
    Refactor/f-replace from here as needed
    .inventory (list)
    .title
    .description
    callbacks with index reference
    .handler1
    .handler2
    .handler3
*/
import classes from './Item/Item.css'
import React from 'react';
import InventoryItem from './InventoryItem/InventoryItem';

import classes from './Inventory.css';

const inventory = (props)=> {

    const inventoryItems = (
        props.inventory.map(item => (
            <InventoryItem key={item.id}
                img={item.imageURL}
                name={item.itemName}
                desc={item.desc}
                clicked={() => this.itemClicked(item.id)}
            />
        ))
    )

    return (
        <div className={classes.Inventory}>
            {inventoryItems}

        </div>

    )


}
    // props.inventory.map((item, index)=>{
    //     return <Item
    //     // //usage
    //     // click1={()=>item.handler1(index)}
    //     // //usage
    //     // click2={()=>item.handler2(index)}
    //     // //usage
    //     // click3={()=>item.handler3(index)}
    //     title={item.title}
    //     description={item.description}
    //     />
    //     });


    export default inventory;
