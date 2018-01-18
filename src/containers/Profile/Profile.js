import React, { Component } from 'react';

import axios from 'axios';

class ClassName extends Component {
    state = {
        inventory: null
    }

    componentDidMount () {
        axios.get('https://barter-sf.firebaseio.com/inventory.json')
            .then(response => {
                // console.log(response);
                this.setState({inventory: response.data});
            });
    }
	render () {
        console.log(this.state.inventory.img);
		return (

            <div>
                 {/* {this.state.inventory.img} */}
            </div>
		);
    }

}

export default ClassName;
