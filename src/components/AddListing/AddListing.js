import React from 'react';

import AddListingForm from './AddListingForm/AddListingForm';

import classes from './AddListing.css';

const AddListing = (props) => {

    console.log('in AdList: ' + props.itemToEdit);

    return (
        <div className={classes.AddListing}>
            {/* <AddListingForm closeModal={props.closeModal} addForm={props.addForm} editingItem={props.editingItem} item={props.item}/> */}
            <AddListingForm {...props}/>
         </div>
    );
}



export default AddListing;
