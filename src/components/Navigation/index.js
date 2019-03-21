import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
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


import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => authUser ? <NavigationAuth authUser= {authUser}/> : <NavigationNonAuth />}
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
    <div>
    <MenuItem component={Link} to={ROUTES.LANDING} >Landing</MenuItem>
    <MenuItem component={Link} to={ROUTES.HOME} >Home</MenuItem>
    <MenuItem component={Link} to={ROUTES.ACCOUNT} >Account</MenuItem>
    <MenuItem component={SignOutButton} >Logout</MenuItem>
    {/* {authUser.roles.includes(ROLES.ADMIN) && (
      <Link to={ROUTES.ADMIN}>Admin</Link>
    )} */}
    </div>

);
const NavigationNonAuth = () => (
  <div>
    <MenuItem component={Link} to={ROUTES.SIGN_IN} >Login</MenuItem>
    <MenuItem component={Link} to={ROUTES.LANDING} >Landing</MenuItem>
    </div>
);


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
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div>
              <IconButton aria-owns={open ? 'menu-hamburger' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-hamburger"
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
                <Navigation />
                </Menu >
            </div>
              <Typography align="center" variant="h6" color="inherit" className={classes.grow}>
                Queue Me
            </Typography>
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
