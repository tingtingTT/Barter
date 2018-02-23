//Haven't tested any of this but it should be legit
import React from 'react';
import firebase from 'firebase';


import ListingItem from './ListingItem/ListingItem';

import classes from './Listing.css';

const listing = (props)=> {

    const listingItems = (
        props.listing.map(item => (
            <ListingItem key={item.id}
                img={item.imageURL}
                name={item.itemName}
                desc={item.desc}
                category={item.category}
                // numBid = {}
                {...console.log(item.name)}
                clicked={() => props.editListingItemHandler(item.id)}
                // Delete item handler
                // TODO: need to re-populate listing items and delete listing items here
                deleteItem={() => props.deleteItemHandler(item.id)}
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
