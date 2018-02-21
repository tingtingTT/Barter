import React, { Component } from 'react';
import axios from 'axios';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import classes from './FilterMenu.css';
import ZipCodeMenu from './ZipCodeMenu/ZipCodeMenu';
import { withRouter } from 'react-router-dom';
import firebase, {database} from 'firebase';

class FilterMenu extends React.Component {

  constructor(props){
      super(props);
      this.filterZip = this.filterZip.bind(this);
      this.filterCategory = this.filterCategory.bind(this);
  }


  filterZip(){
    var zc = document.getElementById('filterZip').value; //zipcode entered
    //console.log(zc);
    return zc;
    //   firebase.database().ref("/itemDb").on('value', function(snap){
    //   snap.forEach(function(childNodes){
    //     //This loop iterates over children of user_id
    //     //childNodes.key is key of the children of userid such as (-L5LoRiCBmIwqNw0kP7c)
    //     //childNodes.val().name;
    //     //childNodes.val().category;
    //     //childNodes.val().location;
    //     //childNodes.val().interval_time
    //     //console.log(childNodes);
    //       if(childNodes.val().location === zc){
    //         console.log(childNodes.val().itemName);
    //       }
    //   });
    // });
  }
  filterCategory(obj){
    return obj;
    // if(obj !== 'Select a Category'){
    //   console.log(obj);
    //   firebase.database().ref("/itemDb").on('value', function(snap){
    //     snap.forEach(function(childNodes){
    //       //This loop iterates over children of user_id
    //       //childNodes.key is key of the children of userid such as (-L5LoRiCBmIwqNw0kP7c)
    //       //childNodes.val().name;
    //       //childNodes.val().time;
    //       //childNodes.val().rest_time;
    //       //childNodes.val().interval_time
    //       //console.log(childNodes);
    //       if(childNodes.val().category === obj){
    //         console.log(childNodes.val().itemName);
    //       }
    //     });
    //   });
    // }
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
