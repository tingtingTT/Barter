import React from 'react';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import { faEnvelopeSquare, faMapPin} from '@fortawesome/fontawesome-free-solid';

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
            
            <p className={classes.userName}>{props.userName}</p>
            <div className={classes.infoBox}>
                <div className={classes.info}>
                    <p>
                        <FontAwesomeIcon icon="envelope" size="1x"/>
                        <span className={classes.infoText}>
                            {props.email}
                        </span>
                    </p>
                </div>
                <div className={classes.info}>
                    
                    <p>
                        <FontAwesomeIcon icon="map-marker" size="1x"/>
                        <span className={classes.infoText}>
                            {props.zipCode}
                        </span>
                    </p>
                </div>
                
                
            </div>
        </div>
        
        
    )
}
    

export default userProfile;