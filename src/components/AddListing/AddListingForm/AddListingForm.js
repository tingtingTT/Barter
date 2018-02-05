import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

import classes from './AddListingForm.css';


const config = {

    apiKey: "AIzaSyDfRWLuvzYmSV3TwmLOppZT0ZZbtIZRlrs",
    authDomain: "barterbuddy-4b41a.firebaseapp.com",
    databaseURL: "https://barterbuddy-4b41a.firebaseio.com",
    projectId: "barterbuddy-4b41a",
    storageBucket: "barterbuddy-4b41a.appspot.com",
    messagingSenderId: "879139739414"

};

let a = "";

let fb = firebase.initializeApp(config, 'listingDb');
let userInfo = fb.database().ref('userInfo/');
let itemDb = fb.database().ref('itemDb');
let userItems = fb.database().ref('userItems');

let currentUser = 'backEndDevWithWrench';

//given the old listing array as retrieved from the server,
//push the new listing onto it, and post it to the server
//over the top of the old listing
function pushUserListing(userId, payload){
    let oldState = [];
    oldState = getUserListingsArray(userId);
    oldState.push(payload);
    userItems.child(userId+'/').set(oldState);
}


function getUserListingsArray(userId){
    let items = null;
    userItems.child(userId).on('value', snapshot =>{
        //console.log(snapshot.val());
        items = snapshot.val();
    });
    return items;
}

class AddListingForm extends Component {
    state = {
        itemForm: {
            itemName: {
                elementType: 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Item Name'
              },
              value: ''
            },
            desc: {
                elementType: 'textarea',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Item Description'
              },
              value: ''
            },
        },
        imageURL: '',
        isUploading: false,
        progress: 0

    }


    // FILE UPLOADER HANDLERS
    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    }
    handleUploadSuccess = (filename) => {
        this.setState({progress: 100, isUploading: false});
        firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({imageURL: url}));
    };

    componentDidMount = () =>{
        console.log(getUserListingsArray(this.props.userId));
        console.log(this.props.userId);
    };


    // POSTS INPUT FIELDS TO DB
    addListingHandler = (event) => { 
        console.log(this.props.userId);
        event.preventDefault();
        console.log("adding to DB");
        

        const listing = {};
        //populate listing object
        for (let formElementIdentifier in this.state.itemForm) {
            listing[formElementIdentifier] = this.state.itemForm[formElementIdentifier].value;
        }
        listing['imageURL'] = this.state.imageURL;


        let items = null;
        userItems.child(this.props.userId).on('value', snapshot =>{
            //console.log(snapshot.val());
            items = snapshot.val();
        });
        if(items == null){
            items = [];
        };
        items.push(listing);
        userItems.child(this.props.userId+'/').set(items).then(response => {this.props.closeModal()});

        //
        // axios.post('https://barterbuddy-4b41a.firebaseio.com/inventory.json', listing).then(response => {
        //     this.props.closeModal()
        // });
           
        

    };

    // TWO-WAY BINDING WITH INPUT FIELDS
    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        const updatedForm = {
            ...this.state.itemForm
        };
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedForm[inputIdentifier] = updatedFormElement;

        this.setState({itemForm: updatedForm});

    }


	render () {
        // MAKE ARRAY OF INPUT OBJECTS
        const formElementsArray = [];
        for (let key in this.state.itemForm) {
            formElementsArray.push({
                id: key,
                config: this.state.itemForm[key]
            });

        }

        // MAKE ARRAY OF INPUT ELEMENTS
        let inputArray = formElementsArray.map(formElement =>(
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            ))
        

        // DISPLAY IMAGE AFTER UPLOAD
        let image = null
        if (this.state.imageURL){
            image = (
                <div className={classes.Image}>
                    <img src={this.state.imageURL} alt=''/>
                </div>
            )
        }
       
        // FORM DISPLAY
        let form = null;
        
        form = (
            <form className={classes.Form} onSubmit={this.addListingHandler}>
                <div className={classes.row1}>
                    <div className={classes.FileLoader} style={{'background-image': 'url(' + this.state.imageURL + ')'}}>
                        <label>
                            <i className="fa fa-pencil fa-2x" aria-hidden="true"></i>
                            <FileUploader
                                hidden
                                accept="image/*"
                                name="item"
                                randomizeFilename
                                storageRef={firebase.storage().ref('images')}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                            />
                        </label>
                    </div>
                    {inputArray[0]}
                    {/* <Input
                        elementType='input'
                        elementConfig={config}
                        value=''
                        changed={(event) => this.inputChangedHandler(event, 'itemName')}/> */}
                </div>



                
                <p>Cancel</p>
                <Button label="Create"  position="rightBottom" />
            </form>
        );

		return (
            <div className={classes.AddListingForm}>
                {form}

            </div>

        );


    }

}
const mapStateToProps = state =>{
    //console.log(state);
    //map state to props looks at the whole redux store and then maps it
    return {
      userId: state.userId
    };
};



export default withRouter(connect(mapStateToProps)(AddListingForm));
