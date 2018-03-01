import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

import classes from './AddListingForm.css';

/* 
TODO (in priority order):
    1. Fix Modal popup positiion
    2. Add form Validation
    3. Show spinner while form is submitting
    4. Show progress while image is uploading
    ......
    Stretch goal:
    ......
    5. Upload multiple images

*/

const config = {

    apiKey: "AIzaSyDfRWLuvzYmSV3TwmLOppZT0ZZbtIZRlrs",
    authDomain: "barterbuddy-4b41a.firebaseapp.com",
    databaseURL: "https://barterbuddy-4b41a.firebaseio.com",
    projectId: "barterbuddy-4b41a",
    storageBucket: "barterbuddy-4b41a.appspot.com",
    messagingSenderId: "879139739414"

};

let fb = firebase.initializeApp(config, 'listingDb');

let userItems = fb.database().ref('userItems/');



//given the old listing array as retrieved from the server,
//push the new listing onto it, and post it to the server
//over the top of the old listing

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
              value: '',
              clicked: false
            },
            desc: {
                elementType: 'textarea',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Item Description'
              },
              value: '',
              clicked: false
            },
            category: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'tv', displayValue: 'Electronics'},
                        {value: 'gamepad', displayValue: 'Games'},
                        {value: 'briefcase', displayValue: 'Service'},
                        {value: 'wrench', displayValue: 'Appliance'},
                        {value: 'images', displayValue: 'Craft'},
                        {value: 'female', displayValue: 'Clothing'},
                        {value: 'futbol', displayValue: 'Sporting Goods'},
                        {value: 'gem', displayValue: 'Jewelry'},
                        {value: 'home', displayValue: 'Home Goods'},
                        {value: 'bath', displayValue: 'Furniture'}
                    ]
                },
                value: 'Electronics',
                clicked: false
            },
            ItemType: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'auction', displayValue: 'Auction Item'},
                        {value: 'bid', displayValue: 'Bid Item'},
                    ]
                },
                value: 'auction',
                clicked: false
            }
        },
        imageURL: '',
        isUploading: false,
        progress: 0

    };

    // FILE UPLOADER HANDLERS
    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    };
    handleUploadSuccess = (filename) => {
        this.setState({progress: 100, isUploading: false});
        firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({imageURL: url}));
    };

    componentDidMount = () =>{
        //console.log(getUserListingsArray(this.props.userId));
        //console.log(this.props.userId);
    };


    // POSTS INPUT FIELDS TO DB
    addListingHandler = (event) => { 
        console.log("addlisting userID:", this.props.userId);
        event.preventDefault();

    
        const listing = {};
        // Create listing obj with values depending if they were updated while editing, or if its a new value
        for (let formElementIdentifier in this.state.itemForm) {
            if (this.state.itemForm[formElementIdentifier].clicked === false && this.props.editingItem){

                const values = {
                    itemName: this.props.itemName,
                    desc: this.props.desc,
                    category: this.props.category,
                    ItemType: this.props.ItemType
                }

                listing[formElementIdentifier] = values[formElementIdentifier]

            }else {
                
                listing[formElementIdentifier] = this.state.itemForm[formElementIdentifier].value;
               
            }
            
        }

        // Set the img url depending if it was updated while editing, or if its a new image
        if (this.props.editingItem){
            if (this.state.imageURL === ''){
                listing['imageURL'] = this.props.imgURL;
            }else{
                listing['imageURL'] = this.state.imageURL;
            }   
        }else {
            listing['imageURL'] = this.state.imageURL;
        }
        
        
        // update existing item
        if(this.props.editingItem){
            //TODO: Convert this to firebase UserItems format
            console.log('attempting to push to user:slot',this.props.userId, this.props.id);
            userItems.child(this.props.userId).child(this.props.id).set({
                itemName: listing.itemName,
                desc: listing.desc,
                category: listing.category,
                imageURL: listing.imageURL,
                ItemType: listing.ItemType,
                ownerUser: this.props.userId,
                public: true,
                location:'95060'
            }).then(response => {
                this.resetValues();
                this.props.closeModal();
            });
        }else{
            //TODO: Add logic for determining if public or private listing and send to a separate database
            if(listing.ItemType === 'auction'){
                // PUSH to public AuctionDB
                firebase.database().ref('auctionDB/').push({
                    itemName: listing.itemName,
                    desc: listing.desc,
                    category: listing.category,
                    imageURL: listing.imageURL,
                    ItemType: listing.ItemType,
                    ownerUser: this.props.userId,
                    public: true,
                    location:'95060',
    
                }).then(response => {
                    console.log('Posted to central itemDb')
                });

                // Items assoc. with user
                userItems.child(this.props.userId).child('/auction').push({
                    itemName: listing.itemName,
                    desc: listing.desc,
                    category: listing.category,
                    imageURL: listing.imageURL,
                    ItemType: listing.ItemType,
                    ownerUser: this.props.userId,
                    public: true,
                    location:'95060'
                }).then(response => {
                    this.resetValues();
                    this.props.closeModal();
                });
            }
            else{
                // PUSH to inventory
                userItems.child(this.props.userId).child('/inventory').push({
                    itemName: listing.itemName,
                    desc: listing.desc,
                    category: listing.category,
                    imageURL: listing.imageURL,
                    ItemType: listing.ItemType,
                    ownerUser: this.props.userId,
                    public: true,
                    location:'95060'
                }).then(response => {
                    this.resetValues();
                    this.props.closeModal();
                });
            }
            

            // Add new item
            // let items = null;
            // userItems.child(this.props.userId).once('value', snapshot =>{
            //     console.log(snapshot.val());
            //     items = snapshot.val();
            // }).then(()=>{
            //     if(items === null){
            //         console.log('items is null');
            //         items = [];
            //         items.push(listing);
            //     }else{
            //         items.push(listing);
            //     }

            //     userItems.child(this.props.userId+'/').set(items).then(response => {
            //         this.resetValues();
            //         console.log('listing sent adllisting userID', this.props.userId);
            //         this.props.closeModal();
            //     });
            //     //just in case it fucks up

            //     this.resetValues();
            //     this.props.closeModal();
            // });
            //
            //
            // axios.post('https://barterbuddy-4b41a.firebaseio.com/inventory.json', listing).then(response => {
            //     this.resetValues();
            //     this.props.closeModal()
            // });
        
        }
        
        listing['imageURL'] = this.state.imageURL;


    // TODO: NEEDS REVIEW
        // let items = null;
        // userItems.child(this.props.userId).on('value', snapshot =>{
        //     //console.log(snapshot.val());
        //     items = snapshot.val();
        // });
        // if(items == null){
        //     items = [];
        // };
        // items.push(listing);
        // userItems.child(this.props.userId+'/').set(items).then(response => {this.props.closeModal()});

        //
        // axios.post('https://barterbuddy-4b41a.firebaseio.com/inventory.json', listing).then(response => {
        //     this.props.closeModal()
        // });
           
        

    };

    // Reset to a blank form after submitting
    resetValues = () => {
        const updatedForm = {
            ...this.state.itemForm
        };
        let updatedFormElement = {};

        for (let key in this.state.itemForm){
            updatedFormElement = {
                ...updatedForm[key]
            };
            updatedFormElement.value = '';
            updatedFormElement.clicked = false;
            updatedForm[key] = updatedFormElement;
        }
    
        this.setState({itemForm: updatedForm, imageURL: ''});
    }

    // Delete item handler
    deleteItem = () => {
        console.log('registered delete');
        if(this.props.editingItem){
            firebase.database().ref('inventory/' + this.props.id).remove().then(response => {
                this.resetValues();
                this.props.closeModal();
            });
        }
    }

    // TWO-WAY BINDING WITH INPUT FIELDS
    inputChangedHandler = (event, inputIdentifier) => {
        
            
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

    inputClicked = (element) => {

        
        // Copy state
        let updatedForm = {
            ...this.state.itemForm
        }
        let updatedState = {
            ...this.state.itemForm[element]
        }
        updatedState.clicked = true;

        // Set the config value to the prepopulated value 
        if(this.props.editingItem){
            const values = {
                itemName: this.props.itemName,
                desc: this.props.desc,
                category: this.props.category,
                ItemType: this.props.ItemType
            }
            updatedState.value = values[element];
        }
        
        updatedForm[element] = updatedState;
        this.setState({itemForm: updatedForm});
    }
   
    

	render () {

        // Create values array with props values so they are easy to use
        const values = {
            itemName: this.props.itemName,
            desc: this.props.desc,
            category: this.props.category,
            ItemType: this.props.ItemType
        }
    


        // MAKE ARRAY OF INPUT OBJECTS
        const formElementsArray = [];

        // Show the values of the item if one is being edited
        if (this.props.editingItem){
        
            for (let key in this.state.itemForm) {
                console.log(key);
                if (!this.state.itemForm[key].clicked){
                    const config = {
                        ...this.state.itemForm[key]
                    }
                    if(this.props.editingItem) {
                        config.value = values[key]
                    }
                    
                    formElementsArray.push({
                        id: key,
                        config: config
                    });
                }
                else {
                    
                    formElementsArray.push({
                        id: key,
                        config: this.state.itemForm[key]
                    });
                    
                }
    
            }
        }else {
            // Show empy form
            for (let key in this.state.itemForm) {
                formElementsArray.push({
                    key: key,
                    id: key,
                    config: this.state.itemForm[key]
                });
            }
                
        }
       

        // DISPLAY IMAGE AFTER UPLOAD
        let image = null
        if (this.state.imageURL){
            image = (
                {'background-image': 'url(' + this.state.imageURL + ')'}
            )
        } else if (this.props.editingItem && !this.state.imageURL){
            image = (
                {'background-image': 'url(' + this.props.imgURL + ')'}
            )
        }
       
        // FORM DISPLAY
        let form = null;

        // Show Save of Create depending on if the item is being edited
        let button = null;
        if (this.props.editingItem) {
            button = (
                <Button label="Save" />
            )
        }else {
            button = (
                <Button label="Create" />
            )
        }

        // Display Delete Button if Editing item
        let deleteBut = null;
        if (this.props.editingItem) {
            deleteBut = (
                <p className={classes.Delete} onClick={this.deleteItem}>Delete</p>
            )
        }
        
        form = (
            <form className={classes.Form} onSubmit={this.addListingHandler}>
                 
                <div className={classes.FileLoader} style={image}>
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
            
            
                {formElementsArray.map(formElement =>(
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        clicked={() => this.inputClicked(formElement.id)}
                        
                        />
                ))}
                
                {deleteBut}
                {button}
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
    console.log('State is',state);
    //map state to props looks at the whole redux store and then maps it
    return {
      userId: state.userId
    };
};



export default withRouter(connect(mapStateToProps)(AddListingForm));
