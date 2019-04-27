import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import QueueList from './QueueList';
import { QueueMusic } from 'material-ui-icons';

class Queues extends Component {
    constructor(props){
        super(props);

        this.state = {
            company: '',//nome della compagnia
            branch: '',//filiale
            location: '',//coordinate
            loading: false,
            usercounter: 0,
            queues: [],//code disponibili          
        }
    }
    componentDidMount(){
        this.onListenForQueue();
    }

    onListenForQueue = () => {
        this.setState({loading: true});

        this.props.firebase
            .queues()
            .on('value', snapshot =>{
                const queueObject = snapshot.val();

                if(queueObject){
                    const queueList = Object.keys(queueObject).map(key => ({
                        ...queueObject[key],
                        uid: key,
                    }));
                    this.setState({
                        queues: queueList,
                        loading: false,
                    })
                } else {
                    this.setState({
                        queues:null,
                        loading: false
                    })
                }
            });
        
    }

    componentWillUnmount(){
        this.props.firebase.queues().off();
    }
    //TODO: selezionabile solo dagli autorizzati
    onCreateQueue = (event, company, branch) => {
        this.props.firebase.queues().push({
            company: company,
            branch: branch,
            location: branch.location,
            usercounter: 0,
        });
       event.preventDefault(); 
    }

    addUserInQueue = ( queue, authUser ) =>{
        
        //in alternativa a questo codice si puo' utilizzare attraverso le 
        //functions di firebase un modo per aggiornare il contatore ogni volta che 
        //viene aggiunto un child
        var userInTheQueue = this.props.firebase.usercounter(queue.uid);
        userInTheQueue.transaction( current_value => {
            return (current_value || 0) + 1;
        });
        //aggiunge un child agli utenti in coda con come key l'uid dell'utente
        //controllare enqueue per 
        this.props.firebase.enqueue( queue , authUser ).push(true);
    }
    removeUserFromQueue = ( queue, authUser) =>{
        var userInTheQueue = this.props.firebase.usercounter(queue.uid);
        userInTheQueue.transaction( current_value => {
            return (current_value || 0) - 1;
        });
        this.props.firebase.dequeue (queue, authUser).remove();
    }
    render(){
        const { user } = this.props;
        const { queues, company, branch, location, usercounter } = this.state;
        return(
            <AuthUserContext.Consumer>
            {authUser => (         

                <QueueList
                    queues = {queues.map(queue => ({
                        ...queue,
                        company: company,
                        branch: branch,
                        location: location,
                        usercounter: usercounter

                    }))}
                    onEnqueue={this.addUserInQueue}
                    onDequeue={this.removeUserFromQueue}
                    
                />
            )}
            </AuthUserContext.Consumer>
        )
    }


}

