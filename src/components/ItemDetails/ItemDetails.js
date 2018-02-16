import React from 'react';
import firebase from 'firebase';

import classes from './ItemDetails.css';

const itemDetails = ( props ) => {
    //TODO: Get item from DB using props.itemID

    //Dummy Item
    const item = {
        title: 'DVD Collection',
        desc: 'This is my extensive DVD collection. I have a multitude of genres. They are very rare. wow.',
        img: 'https://i.ytimg.com/vi/0S-gteTLcko/maxresdefault.jpg',
        zipCode: 92004,
        owner: 'PennyMonster38'
    }

    
    return (
        <div className = {classes.ItemDetails}>
            <div className = {classes.row}>
                <div className = {classes.col1of2}>
                    
                    <h1>{item.title}</h1>
                    <img src={item.img} className={classes.image}/>
                    <p className = {classes.owner}>{item.owner}</p>
                </div>
                <div className = {classes.col1of2}>
                    {/*pass in item.zipCode as props to the map*/}
                    MAP
                </div>
            </div>
            <div className = {classes.row}>
                <div className = {classes.description}>
                    <p classes = {classes.descText}>{item.desc}</p>
                </div>
            </div>

        </div>
    );

    
}

export default itemDetails;