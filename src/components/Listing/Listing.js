//Haven't tested any of this but it should be legit
import React from 'react';
import firebase from 'firebase';


import ListingItem from './ListingItem/ListingItem';

import classes from './Listing.css';

const listing = (props)=> {

    const listingItems = (
        //CHANGE ADDED HERE   <__  V  __>

        props.listing.map((item, index) => (
            <ListingItem key={index}
                img={item.imageURL}
                name={item.itemName}
                desc={item.desc}
                category={item.category}
                {...console.log(item.category)}
                // numBid = {}
                // {...console.log(item.name)}

                clicked={() => props.editListingItemHandler(index, 'bidItem')}

                // Delete item handler
                // TODO: need to re-populate listing items and delete listing items here
                delclicked={() => props.delclicked(index)}
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
