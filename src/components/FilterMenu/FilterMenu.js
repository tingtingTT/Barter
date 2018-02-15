import React, { Component } from 'react';
import axios from 'axios';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import classes from './FilterMenu.css';
import ZipCodeMenu from './ZipCodeMenu/ZipCodeMenu';
import { withRouter } from 'react-router-dom';

class FilterMenu extends React.Component {

  constructor(props){
      super(props);
      this.filterZip = this.filterZip.bind(this);
      this.filterCategory = this.filterCategory.bind(this);
  }
  filterZip(){
    console.log("test");
  }
  filterCategory(obj){
    if(obj !== 'Select a Category'){
      console.log(obj);
      //handle
    }
    console.log("test2");
  }

  render() {

    return (
      <div className={classes.FilterMenu}>
        <div className={classes.menuItem}>
        <CategoryMenu onChange ={this.filterCategory}/>
      </div>
      <div className={classes.menuItem}>
        <ZipCodeMenu onClick={this.filterZip}/>
      </div>
      </div>
    );
  }

}

export default withRouter(FilterMenu);
