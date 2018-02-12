import React, { Component } from 'react';
import axios from 'axios';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import classes from './FilterMenu.css';

class FilterMenu extends React.Component {

  render() {

    return (
      <div class={classes.CategoryMenu}>
        <CategoryMenu/>
      </div>
    );
  }

}

export default FilterMenu;
