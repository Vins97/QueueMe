import React from 'react';
import { Link } from 'react-router-dom';

//import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
//import * as ROLES from '../../constants/roles';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


// const Navigation = () => (
//   <AuthUserContext.Consumer>
//     {authUser =>
//       authUser ? (<NavigationAuth authUser={authUser} />) : (<NavigationNonAuth />)
//     }
//   </AuthUserContext.Consumer>
// );

// const NavigationAuth = ({ authUser }) => (
//   <div >
//     <AppBar>
//       <ToolBar position="static">
//         <Typography variant="title" color="inherit">
//           <Link to={ROUTES.LANDING}>Landing</Link>
//           <Link to={ROUTES.HOME}>Home</Link>
//           <Link to={ROUTES.ACCOUNT}>Account</Link>
//           {authUser.roles.includes(ROLES.ADMIN) && (
//             <Link to={ROUTES.ADMIN}>Admin</Link>
//           )}
//           <SignOutButton />
//         </Typography>
//       </ToolBar>
//     </AppBar>
//   </div>

// );

// const NavigationNonAuth = () => (
//   <div >
//     <AppBar>
//       <ToolBar position="static">
//         <Typography variant="title" color="inherit">

//           <Link to={ROUTES.LANDING}>Landing</Link>
//           <Link to={ROUTES.SIGN_IN}>Sign In</Link>
//         </Typography>
//       </ToolBar>
//     </AppBar>

//   </div>
// );
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };
 


  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div>
            <IconButton   aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                <MenuItem onClick={<Link to={ROUTES.SIGN_IN}/>}>Profile</MenuItem>
            </Menu>
            </div>
            <Typography align="center" variant="h6" color="inherit" className={classes.grow}>
              Queue Me
            </Typography>
            {auth !== '' && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={<Link to={ROUTES.ACCOUNT} />}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}><SignOutButton /></MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
