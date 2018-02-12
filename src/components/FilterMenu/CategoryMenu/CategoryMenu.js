import React, { Component } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import classes from './CategoryMenu.css';


const CategoryMenu = (props) => {

const categoryList = [
          {value: 'electronics', displayValue: 'Electronics'},
          {value: 'games', displayValue: 'Games'},
          {value: 'service', displayValue: 'Service'},
          {value: 'appliance', displayValue: 'Appliance'},
          {value: 'craft', displayValue: 'Craft'},
          {value: 'clothing', displayValue: 'Clothing'},
          {value: 'sporting', displayValue: 'Sporting Goods'},
          {value: 'jewelry', displayValue: 'Jewelry'},
          {value: 'home', displayValue: 'Home Goods'},
          {value: 'furniture', displayValue: 'Furniture'}
        ];

  return (
      <div class={classes.dropdown}>
        <select name="Categories" id="categoryList">
          {categoryList.map((e, key) => {
            return <option key={key} value={e.value}>{e.displayValue}</option>;
            })
          }
          </select>
        </div>

    )
}


export default CategoryMenu;
