//Component for a single item (user profile only? or use all over site)
import React from 'react';
import './Item.css';
/*
     .inventory (list)
    .title
    .description
    callbacks with index reference
    .handler1 
    .handler2
    .handler3
    
*/

const item = (props) => {
    return (
        <div className="Item">
            <div>
                <p>{props.title}</p>
            </div>
            <div>
                <p>{props.description}</p>
            </div>
            <div>
                <img src={props.image}></img>
            </div>

            <div>
                <button onClick={props.click1}>handler1</button>
                <button onClick={props.click2}>handler2</button>
                <button onClick={props.click3}>handler3</button>
            </div>    
        </div>
    )
};

export default item;