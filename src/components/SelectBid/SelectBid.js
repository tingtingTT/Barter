import React from 'react';

const selectBid = (props) => {

    return(
        <div>
            <input type='submit' value='bid' onCick={props.clicked}/>
        </div>
    );

}

export default selectBid;

