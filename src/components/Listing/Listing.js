//Haven't tested any of this but it should be legit
import React from 'react';

import ListingItem from './ListingItem/ListingItem';

import classes from './Listing.css';

const listing = (props)=> {

    const listingItems = (
        //CHANGE ADDED HERE   <__  V  __>

        props.listing.map((item) => (
            <ListingItem key={item.id}
                img={item.imageURL}
                name={item.itemName}
                desc={item.desc}
                category={item.category}
                // key={props.listing.indexOf(item)}
                // numBid = {}
               deleteHandler={props.deleteHandler}//(item.id)}//(props.listing.indexOf(item))}
            />
        ))
    )

    return (
        <div className={classes.Listing}>
            {listingItems}
        </div>
        
    )
}
 
export default listing;
