import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
// import ImageUploader from '../../containers/ImageUploader/ImageUploader'

import classes from './AddListingForm.css';


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
        progress: 0,
    }

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    }
    handleUploadSuccess = (filename) => {
        this.setState({avatar: filename, progress: 100, isUploading: false});
        firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({imageURL: url}));
    };

    addListingHandler = () => {
        
        const listing = {};
        for (let formElementIdentifier in this.state.itemForm) {
            listing[formElementIdentifier] = this.state.itemForm[formElementIdentifier].value;
        }

        axios.post('https://barterbuddy-4b41a.firebaseio.com/listings.json', listing)
            .then( response => {
                this.props.history.push('/profile');
            });
    }
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

	render () {



        const formElementsArray = [];
        for (let key in this.state.itemForm) {
            formElementsArray.push({
                id: key,
                config: this.state.itemForm[key]
            });

        }


        /*Display the image if one has been uploaded*/
        let image = null
        if (this.state.imageURL){
            image = (
                <div className={classes.Image}>
                    <img src={this.state.imageURL} alt=''/>
                </div>
            )
        }
		return (
            <div className={classes.AddListingForm}>
                <form className={classes.Form}>
                        {image}
                    <FileUploader
                            accept="image/*"
                            name="item"
                            randomizeFilename
                            storageRef={firebase.storage().ref('images')}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                    />
                    {formElementsArray.map(formElement =>(
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                        ))}
                    <Button label="Create" clicked={this.addListingHandler}/>
                </form>

            </div>

        );


    }

}

export default withRouter(AddListingForm);
