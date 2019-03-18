import React, { Components } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose} from 'recompose';

import * as ROUTES from '../../constants/routes';


const SignUpPage = () =>(
    <div>
        <h1> Registrazione </h1>
        <SignUpForm />
    </div>
)
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};
class SignUpFormBase extends Components {
    constructor(props){
        super(props);
        this.state=INITIAL_STATE;
    }
    
    //quando viene fatta l'inscrizione l'utente si logga automaticamente
    onSubmit = event => {
        const {username,email,passwordOne} = this.state;
        
        this.props.firebase.doCreateUserWithEmailAndPassword(email,passwordOne)
        .then(authUser => {
            this.setState({... INITIAL_STATE});
            this.props.history.push(ROUTES.HOME);
        }).catch(error => {
            this.setState({ error });
        });
        
        event.preventDefault();
    }
    
    onChange = event => {
        this.state({ [event.target.name]: event.target.value});
    };
    
    
    render(){
        const{
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;
        const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';
        return (
            <form onSubmit={this.onSubmit}>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                          <input 
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            type="text" 
                            class="form-control" 
                            id="idUsermane" 
                            placeholder="Name Surname" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                          <input 
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            type="email" 
                            class="form-control" 
                            id="idEmail" 
                            placeholder="name@example.com" />
                        </div>
                    </div>
                </div>
                <div class="row">
                <div class="col-md-6">
                        <div class="form-group">
                          <input 
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                            type="password" 
                            class="form-control" 
                            id="idPasswordOne" 
                            placeholder="Password" />
                        </div>
                        <div class="form-group">
                          <input 
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                            type="password" 
                            class="form-control" 
                            id="idPasswordTwo" 
                            placeholder="Confirm Password" />
                        </div>
                      
                    </div> 
                    <div class="row">
                        <button class="btn btn-icon btn-3 btn-primary" type="submit" disabled ={isInvalid}>
                           	<span class="btn-inner--icon"><i class="ni ni-lock-circle-open"></i></span>
                            <span class="btn-inner--text">Registrati</span>
                        </button>
                    </div>
                </div>
            </form>

);
}
}
const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

const SignUpLink = () => (
    <p>
        Don\'t have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);
export default SignUpPage;

export { SignUpForm, SignUpLink};