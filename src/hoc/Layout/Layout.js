import React from 'react';

import Header from '../../components/Header/Header';
import Aux from '../Aux/Aux';

import classes from './Layout.css';

const layout = (props) => (
    <Aux>
        <Header />
        <main className={classes.Content}>
            {props.children}
        </main>

    </Aux>
);

export default layout;
