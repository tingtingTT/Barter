/* Header of the page
*/
import React from 'react';
import NavigationItems from './NavigationItems/NavigationItems';
import classes from './Header.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => (
    <header className={classes.Header}>
        <div className={classes.Logo}>
          <p className={classes.barter}>  <NavLink to='/' exact> Barter </NavLink></p>
        </div>
        <div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    </header>
);

export default Header;
