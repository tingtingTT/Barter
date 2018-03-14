/*
Zip code option for filtering on teh home page
*/
import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './ZipCodeMenu.css';


const ZipCodeMenu = (props) => {
  return (
      <div className={classes.form}>
        <form>
          <input
            className={classes.form}
            id="filterZip"
            type="text"
            pattern="[0-9]{5}"
            name="zipcode"
            placeholder="Filter by zipcode"
          />
          <button id="filterButton" className={classes.button} type="button" onClick={props.onClick}>
            Update
          </button>
        </form>
      </div>
    )
}


export default withRouter(ZipCodeMenu);
