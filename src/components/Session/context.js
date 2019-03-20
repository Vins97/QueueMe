import React from 'react';
//crea un contesto all'interno di react per passare attraverso un AuthUserContext provider
//mentre per utilizzare il contesto basta utilizzare AuthUserContext.Consumer
//oppure attraverso componentDidMount o componentDidUpdate o componentWillUnmount
const AuthUserContext = React.createContext(null);

export default AuthUserContext;
