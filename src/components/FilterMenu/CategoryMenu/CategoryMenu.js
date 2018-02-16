import React, { Component } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import classes from './CategoryMenu.css';


const CategoryMenu = (props) => {

const categoryList = [
          {value: 'Select a Category', displayValue: 'Select a Category'},
          {value: 'Electronics', displayValue: 'Electronics'},
          {value: 'Games', displayValue: 'Games'},
          {value: 'Service', displayValue: 'Service'},
          {value: 'Appliance', displayValue: 'Appliance'},
          {value: 'Craft', displayValue: 'Craft'},
          {value: 'Clothing', displayValue: 'Clothing'},
          {value: 'Sporting Goods', displayValue: 'Sporting Goods'},
          {value: 'Jewelry', displayValue: 'Jewelry'},
          {value: 'Home Goods', displayValue: 'Home Goods'},
          {value: 'Furniture', displayValue: 'Furniture'}
        ];

  return (
      <div className={classes.dropdown}>
        <select name="Categories" id="categoryList" onChange={(event) => props.onChange(event.target.value)}>
          {categoryList.map((e, key) => {
            return <option key={key} value={e.value}>{e.displayValue}</option>;
            })
          }
          </select>
        </div>

    )
}


export default withRouter(CategoryMenu);
