import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => {
  <div>
    <h1> Login </h1>
    <SignInForm />
    <SignUpLink />
  </div>
}

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

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
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <input 
                name="email"
                value={email}
                onChange={this.onChange}
                type="text" 
                class="form-control" 
                id="idUsermane" 
                placeholder="Email " />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input 
                name="password"
                value={password}
                onChange={this.onChange}
                type="password" 
                class="form-control" 
                id="idUsermane" 
                placeholder="Password" />
          </div>
        </div>
      </div>
      <div class="row">
        <button class="btn btn-icon btn-3 btn-primary" type="submit" disabled ={isInvalid}>
         	<span class="btn-inner--icon"><i class="ni ni-lock-circle-open"></i></span>
          <span class="btn-inner--text">Accedi </span>
        </button>
      </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
