/*
List of items on user rpofile page. This listing contains user
items that are currently for auction
*/
import React from 'react';
import ListingItem from './ListingItem/ListingItem';
import classes from './Listing.css';

const listing = (props)=> {
    const listingItems = (
        props.listing.map((item, index) => (
            <ListingItem key={index}
                img={item.imageURL}
                name={item.itemName}
                desc={item.desc}
                category={item.category}
                bidcount={item.bidcount}
                clicked={() => props.editListingItemHandler(index, 'bidItem')}
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
