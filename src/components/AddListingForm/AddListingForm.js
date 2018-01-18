import React from 'react';

import classes from './AddListingForm.css';

const addListingForm = (props) => {

    return (
        <div className={classes.AddListingForm}>
            <form>
                <input type="text" placeholder="Title" />
                <input type="text" placeholder="Description" />
            </form>

        </div>

    );

};

export default addListingForm;
