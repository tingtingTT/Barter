
/*
Form for adding item for listing or user inventory. It allows user
to upload picture, name, description, catagory and the item type
*/
import React from 'react';
import AddListingForm from './AddListingForm/AddListingForm';
import classes from './AddListing.css';

const AddListing = (props) => {
    return (
        <div className={classes.AddListing}>
            <AddListingForm {...props}/>
        </div>
    );
}

export default AddListing;
