import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink , SignUpCompanyLink} from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';


import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';



const SignInPage = () => (
  
    <div>
      <Typography variant="h5" color="textSecondary" gutterBottom align="center">
        Accedi
      </Typography>
    <Typography component="p" align="center">
    <Grid justify="center"
  alignItems="center" container spacing={24}>
    <Grid item xs={8} >
      <SignInForm />
      </Grid>
      <Grid item xs={8} >
      <SignInGoogle /></Grid>
      <Grid item xs={8} >
      <SignInFacebook /></Grid>
      <Grid item xs={8} >
      <PasswordForgetLink /></Grid>
      <Grid item xs={8} >
      <SignUpLink /></Grid>
      <Grid item xs={8} >
      <SignUpCompanyLink /></Grid>
      </Grid>
    </Typography>
    </div>
 

);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};
//accedi con emai e password
class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  // handleChange = prop => event => {
  //   this.setState({ [prop]: event.target.value });
  // };

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';



    return (
      
        <form onSubmit={this.onSubmit}>
        <Input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Input
          name="password"
          value={this.state.password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
          <Button disabled={isInvalid} variant="contained" color="primary" type="submit">
            Login
          </Button>
          {error && <p>{error.message}</p>}
          </form>
      
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: [],
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error });
      });
    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <div>
         
        <Button  size="large" variant="contained" color='secondary' onClick={this.onSubmit}>Login Google</Button>
        
        {error && <p>{error.message}</p>}
      </div>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: [],
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <div>
          
        <Button size="large" variant="contained" color='primary' onClick={this.onSubmit}>Login Facebook</Button>
        
        {error && <p>{error.message}</p>}
      </div>
    );
  }
}


//class SignUpCompanyBase extends Component {
 // constructor(props) {
 //   super(props);

 //   this.state = { error: null };
 // }

 // onSubmit = event =>{
    

    
 // }


 // render() {
  //  const { error } = this.state;

  //  return (
  //    <div>
  //      <p>Sei un'azienda ? Effettua il SignUp apposito ! </p>
          
   //     <Button size="large" variant="contained" color='primary' onClick={this.onSubmit}>SignUp Company</Button>
        
   //     {error && <p>{error.message}</p>}
  //    </div>
  //  );
 // }
//}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);


export default withStyles(styles)(SignInPage);

export { SignInForm, SignInGoogle, SignInFacebook};