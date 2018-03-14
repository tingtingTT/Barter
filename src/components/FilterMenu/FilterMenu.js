/* Filter menu for home page. User can filter items by ites
category for zipcoode, or both
*/
import React from 'react';
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
    var zc = document.getElementById('filterZip').value; 
    return zc;
  }
  filterCategory(obj){
    return obj;
  }

  render() {
    return (
      <div className={classes.FilterMenu}>
        <div className={classes.menuItem}>
        <CategoryMenu onChange ={this.props.onChange}/>
      </div>
      <div className={classes.menuItem}>
        <ZipCodeMenu onClick={this.props.onClick}/>
      </div>
      </div>
    );
  }
}

export default withRouter(FilterMenu);
