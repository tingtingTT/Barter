import React from 'react';

const inventoryItem = (props) => (

    <div>
        <img src={props.img} />
        <p>{props.name}</p>
        <p>{props.desc}</p>
    </div>

);

export default inventoryItem;
