import React from 'react';

const selectBid = (props) => {
    let item = {
        itemKey: 1234,
        owner: 'henryman',
        zipcode: 27446,
        title: 'rock collection'
    }
    
    return(
        <div>
            <input type='submit' value='bid' onClick={() => props.addBid(item)}/>
        </div>
    );

}

export default selectBid;

