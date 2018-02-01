//Component for a single item (user profile only? or use all over site)
import React from 'react';
import classes from './Item.css';
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
        <div className={classes.Item}>
            <div>
                <p>{props.title}</p>
            </div>
            <div>
                <p width="50px" >{props.description}</p>
            </div>
            <div>
                <img src={props.image}></img>
            </div>

            <div display="flex" flex-flow="column"  flex >
                <button onClick={props.click1}>handler1</button>
                <button onClick={props.click2}>handler2</button>
                <button onClick={props.click3}>handler3</button>
            </div>    
        </div>
    )
};

export default item;