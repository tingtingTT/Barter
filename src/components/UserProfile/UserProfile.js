import React from 'react';

import classes from './UserProfile.css';

const userProfile = (props) => {
    const image = (
        {'background-image': 'url(' + props.profilePic + ')'}
    );
    return (

        <div className={classes.profileContainer}>
            <div className={classes.profPic} 
                style={image}>
            </div>
            
            <p>{props.userName}</p>
            <div className={classes.infoBox}>
                <p>{props.email}</p>
                <p>{props.zipCode}</p>
            </div>
        </div>   
        
    )
}
    

export default userProfile;