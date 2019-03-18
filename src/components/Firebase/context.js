//usa le context API di fornite da react 

import React from 'react';

//questa funzione crea un provider e un consumer
const FirebaseContext = React.createContext(null);
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props } firebase={firebase}/>}
    </FirebaseContext.Consumer>
)

export default FirebaseContext;