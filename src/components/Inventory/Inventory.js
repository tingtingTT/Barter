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

import React from 'react';
import Item from './Item/Item';

const inventory = (props)=>
props.inventory.map((item, index)=>{
    return <Item
    //usage
    click1={()=>item.handler1(index)}
    //usage
    click2={()=>item.handler2(index)}
    //usage
    click3={()=>item.handler3(index)}
    title={item.title}
    description={item.description}
    />
    });
    export default inventory;