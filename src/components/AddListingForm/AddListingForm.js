import React from 'react';

import Button from '../UI/Button/Button';

import classes from './AddListingForm.css';

const addListingForm = (props) => {

    return (
        <div className={classes.AddListingForm}>
            <p>Add a listing to your inventory</p>
            <form className={classes.Form}>
                <input type="text" placeholder="Title" />
                <textarea placeholder="Description" rows="15"></textarea>
                <Button label="Create"/>
            </form>

        </div>

    );

};

export default addListingForm;
