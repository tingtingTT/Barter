import React from 'react';

import Header from '../../components/Header/Header';
import Auxiliary from '../Auxiliary/Auxiliary';

import classes from './Layout.css';

const layout = (props) => (
    <Auxiliary>
        <Header />
        <main className={classes.Content}>
            {props.children}
        </main>

    </Auxiliary>
);

export default layout;
