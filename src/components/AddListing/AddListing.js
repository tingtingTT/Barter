import React from 'react';

import AddListingForm from './AddListingForm/AddListingForm';

import classes from './AddListing.css';

const AddListing = (props) => (


    <div className={classes.AddListing}>
        <AddListingForm closeModal={props.closeModal} addForm={props.addForm}/>
    </div>


);

export default AddListing;
