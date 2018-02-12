import React, { Component } from 'react';
import axios from 'axios';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import classes from './FilterMenu.css';
import ZipCodeMenu from './ZipCodeMenu/ZipCodeMenu';
import { withRouter } from 'react-router-dom';

class FilterMenu extends React.Component {

  render() {

    return (
      <div className={classes.FilterMenu}>
        <div className={classes.menuItem}>
        <CategoryMenu/>
      </div>
      <div className={classes.menuItem}>
        <ZipCodeMenu/>
      </div>
      </div>
    );
  }

}

export default withRouter(FilterMenu);
