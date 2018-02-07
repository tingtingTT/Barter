import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

import classes from './AddListingForm.css';

/* 
TODO (in priority order):
    1. Fix Modal popup positiion
    2. Show spinner while form is submitting
    3. Show progress while image is uploading
    ......
    Stretch goal:
    ......
    4. Upload multiple images

*/

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
                        {value: 'electronics', displayValue: 'Electronics'},
                        {value: 'games', displayValue: 'Games'},
                        {value: 'service', displayValue: 'Service'},
                        {value: 'appliance', displayValue: 'Appliance'},
                        {value: 'craft', displayValue: 'Craft'},
                        {value: 'clothes', displayValue: 'Clothes'},
                        {value: 'sporting', displayValue: 'Sporting Goods'},
                        {value: 'jewelry', displayValue: 'Jewelry'},
                        {value: 'home', displayValue: 'Home Goods'},
                        {value: 'furniture', displayValue: 'Furniture'}
                    ]
                },
                value: 'Electronics',
                clicked: false
            }
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


    // POSTS INPUT FIELDS TO DB
    addListingHandler = (event) => { 

        event.preventDefault();

    
        const listing = {};
        for (let formElementIdentifier in this.state.itemForm) {
            if (this.state.itemForm[formElementIdentifier].clicked === false && this.props.editingItem){

                const values = {
                    itemName: this.props.itemName,
                    desc: this.props.desc,
                    category: this.props.category,
                }

                listing[formElementIdentifier] = values[formElementIdentifier]
                
              

            }else {
                
                listing[formElementIdentifier] = this.state.itemForm[formElementIdentifier].value;
               
            }
            
        }

        if (this.props.editingItem){
            if (this.state.imageURL == ''){
                listing['imageURL'] = this.props.imgURL;
            }else{
                listing['imageURL'] = this.state.imageURL;
            }   
        }else {
            listing['imageURL'] = this.state.imageURL;
        }
        
        
        // update existing item
        if(this.props.editingItem){
            firebase.database().ref('inventory/' + this.props.id).set({
                itemName: listing.itemName,
                desc: listing.desc,
                category: listing.category,
                imageURL: listing.imageURL

            }).then(response => {
                this.resetValues();
                this.props.closeModal();
            });
        }else{
            // Add new item
            axios.post('https://barterbuddy-4b41a.firebaseio.com/inventory.json', listing).then(response => {
                this.resetValues();
                this.props.closeModal()
            });
        
        }
        
           
        

    }

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

    deleteItem = () => {
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

        console.log('clicked');
        
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
            }
            updatedState.value = values[element];
        }
        
        updatedForm[element] = updatedState;
        this.setState({itemForm: updatedForm});
    }
   
    

	render () {

        
        const values = {
            itemName: this.props.itemName,
            desc: this.props.desc,
            category: this.props.category,
        }
    


        // MAKE ARRAY OF INPUT OBJECTS
        const formElementsArray = [];

        // Show the values of the item if one is being edited
        if (this.props.editingItem){
        
            for (let key in this.state.itemForm) {
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
        )
        
    
       
    
		return (
            <div className={classes.AddListingForm}>
                {form}

            </div>

        );


    }

}

export default withRouter(AddListingForm);
