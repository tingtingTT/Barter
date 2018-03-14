
/*
Filetr category menu on home page
*/
import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './CategoryMenu.css';


const CategoryMenu = (props) => {

const categoryList = [
  {value: 'Select a Category', displayValue: 'Select a Category'},
  {value: 'tv', displayValue: 'Electronics'},
  {value: 'gamepad', displayValue: 'Games'},
  {value: 'briefcase', displayValue: 'Service'},
  {value: 'wrench', displayValue: 'Appliance'},
  {value: 'images', displayValue: 'Craft'},
  {value: 'female', displayValue: 'Clothing'},
  {value: 'futbol', displayValue: 'Sporting Goods'},
  {value: 'gem', displayValue: 'Jewelry'},
  {value: 'home', displayValue: 'Home Goods'},
  {value: 'bath', displayValue: 'Furniture'}
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
