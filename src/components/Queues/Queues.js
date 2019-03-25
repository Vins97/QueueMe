import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import QueueList from './QueueList';

class Queues extends Component {
    constructor(props){
        super(props);

        this.state = {
            company: '',
            loading: false,
            queues: [],
                        
        }
    }
}
