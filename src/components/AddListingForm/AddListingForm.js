import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

import Button from '../UI/Button/Button';
// import ImageUploader from '../../containers/ImageUploader/ImageUploader'

import classes from './AddListingForm.css';


class AddListingForm extends Component {
    state = {
        item: {
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
            imageURL: ''
        },
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
    }

	render () {

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
                    {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                    {/* {this.state.imageURL && <img className={classes.Image} src={this.state.imageURL} alt=''/> } */}
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
                    <input type="text" placeholder="Title" />
                    <textarea placeholder="Description" rows="15"></textarea>
                    <Button label="Create" clicked={this.addListingHandler}/>
                </form>

            </div>

        );


    }

}

export default AddListingForm;
