/*
Current auction items on home page. Each item contains its name, catagory, number of bids and 
description
*/
import React from 'react';
import ListingItemHome from './ListingitemHome/ListingItemHome';
import classes from '../Listing/Listing.css';

const listingHome = (props)=> {
    const listingItemsHome = (
        props.listing.map(item => (
            <ListingItemHome
                key={item.itemKey}
                bidcount={item.bidcount}
                img={item.imageURL}
                name={item.itemName}
                desc={item.desc}
                category={item.category}
                itemKey={item.itemKey}
                owner={item.ownerUser}
                zipCode={item.location}
            />
        ))
    )

    return (
        <div className={classes.ListingHome}>
            {listingItemsHome}
        </div>
    )
}

export default listingHome;
