/*
Navigation item on header
*/
import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';

const navigationItem = (props) => (
    props.show ? 
    <li className={classes.NavigationItem} onClick={props.clicked}>
        <NavLink
            to={props.link}
            exact>
                {props.children}
        </NavLink>
    </li>
    : null
);

export default navigationItem;
