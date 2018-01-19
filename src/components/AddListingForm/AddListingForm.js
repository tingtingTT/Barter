import React from 'react';

import Button from '../UI/Button/Button';

import classes from './AddListingForm.css';

const addListingForm = (props) => {

    return (
        <div className={classes.AddListingForm}>
            <form className={classes.Form}>
                <input type="text" placeholder="Title" />
                <input type="text" placeholder="Description" />
                <Button label="Create"/>
            </form>

        </div>

    );

};

export default addListingForm;
