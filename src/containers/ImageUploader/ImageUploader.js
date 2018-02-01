import React from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

const ImageUploader = (props) => (
    <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref('images')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
);

export default ImageUploader;
