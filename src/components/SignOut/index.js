import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
    <button class="btn btn-icon btn-2 btn-primary" type="button" onClick={firebase.doSignOut}>
        <span class="btn-inner--icon"><i class="ni ni-button-power"></i></span>
    </button>
);

export default withFirebase(SignOutButton);