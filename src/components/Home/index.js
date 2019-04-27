import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import Messages from '../Messages';
import Qcard from '../Home/Qcard';
 import Grid from '@material-ui/core/Grid';
 import Typography from '@material-ui/core/Typography';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      number: 0,
      avatartxt: "A",
      titletxt: "Queue 2",
      description : "This is the queue for theasasa place name ,Briefly description" ,
      image: " img"
    };
  }

  componentDidMount() {
    this.props.firebase.users().on('value', snapshot => {
      this.setState({
        users: snapshot.val(),
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    return (<div>
    
    <Typography component="p" align="center">
     <Grid justify="center"
  alignItems="center" container spacing={24}>
  <Grid item xs={8} >
      
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>

          <Qcard avatartxt={this.state.avatartxt}/>
       
     
      </Grid>

      <Grid item xs={8} >
      <Qcard/>
      </Grid>

      </Grid> 
      <Messages users={this.state.users} />
      </Typography> </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
