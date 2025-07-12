import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import { ShoppingCart, Person, ExitToApp } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/circles.png";
import useStyles from "./styles";
import Login from "../Login/Login";
import Register from "../Register/Register";

const Navbar = ({ totalItems, setUserAccount, onCartClick }) => {
  const classes = useStyles();
  const location = useLocation();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  // Check if we're on the account page
  const isOnAccountPage = location.pathname === '/account';

  // Add this useEffect to sync with localStorage on mount
  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userUsername = localStorage.getItem('userUsername');
    const userAvatar = localStorage.getItem('userAvatar');
    if (userName || userUsername) {
      setUser({
        name: userName || userUsername,
        email: userEmail || '',
        username: userUsername || '',
        avatar: userAvatar || `https://ui-avatars.com/api/?name=${userName || userUsername}&background=667eea&color=fff`
      });
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginClick = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };

  const handleSwitchToRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const handleSwitchToLogin = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  const handleLogin = (userData) => {
    console.log('Navbar handleLogin received:', userData);
    
    // Handle regular login/registration
    if (userData.username && userData.password) {
      // Login - use the actual username from the response
      const userInfo = {
        name: userData.username, // Use the actual username
        email: userData.email || '',
        username: userData.username,
        avatar: `https://ui-avatars.com/api/?name=${userData.username}&background=667eea&color=fff`
      };
      console.log('Setting user info for login:', userInfo);
      setUser(userInfo);
      setIsLoggedIn(true);
      
      // Store user info in localStorage for account page
      localStorage.setItem('userName', userInfo.name);
      localStorage.setItem('userEmail', userInfo.email);
      localStorage.setItem('userUsername', userInfo.username);
      localStorage.setItem('userAvatar', userInfo.avatar);
      localStorage.setItem('userJoinDate', new Date().toLocaleDateString());
      
      // Set account number for cart functionality
      const userId = localStorage.getItem('userId');
      if (userId && setUserAccount) {
        setUserAccount(userId);
      }
    } else if (userData.firstName && userData.lastName) {
      // Registration
      const userInfo = {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        username: userData.username,
        avatar: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=667eea&color=fff`
      };
      console.log('Setting user info for registration:', userInfo);
      setUser(userInfo);
      setIsLoggedIn(true);
      
      // Store user info in localStorage for account page
      localStorage.setItem('userName', userInfo.name);
      localStorage.setItem('userEmail', userInfo.email);
      localStorage.setItem('userUsername', userInfo.username);
      localStorage.setItem('userAvatar', userInfo.avatar);
      localStorage.setItem('userRole', 'USER');
      localStorage.setItem('userJoinDate', new Date().toLocaleDateString());
      
      // Set account number for cart functionality
      const userId = localStorage.getItem('userId');
      if (userId && setUserAccount) {
        setUserAccount(userId);
      }
    }
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setUserMenuAnchor(null);
    
    // Clear user data from localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userUsername');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userJoinDate');
    window.location.href = '/';
  };

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            className={`${classes.title} navbar-title`}
            color="inherit"
          >
            <img
              src={logo}
              alt="Pahana Book Shop"
              height="50px"
              className={classes.image}
            />
            <div className="gradient-text">Pahana Book Shop</div>
          </Typography>

          <div className={classes.grow} />
          
          {/* Page Indicator */}
          {isOnAccountPage && (
            <Typography 
              variant="body2" 
              color="primary" 
              style={{ 
                marginRight: 16, 
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Person style={{ marginRight: 4, fontSize: 16 }} />
              Account Page
            </Typography>
          )}
          
          {/* Cart Icon */}
          <div className={classes.button}>
            <IconButton
              onClick={onCartClick}
              aria-label="Show cart items"
              color="inherit"
            >
              <Badge badgeContent={totalItems} color="secondary" overlap="rectangular">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>

          {/* Login/User Menu */}
          <div className={classes.userSection}>
            {isLoggedIn ? (
              <>
                <div style={{ position: 'relative' }}>
                  <IconButton
                    onClick={handleUserMenuClick}
                    className={classes.userButton}
                  >
                    <Avatar
                      src={user?.avatar}
                      alt={user?.name}
                      className={classes.avatar}
                      style={isOnAccountPage ? { border: '2px solid #1976d2' } : {}}
                    >
                      {user?.name?.charAt(0)}
                    </Avatar>
                  </IconButton>
                  {isOnAccountPage && (
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#1976d2',
                      borderRadius: '50%',
                      border: '1px solid white'
                    }} />
                  )}
                </div>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                  className={classes.userMenu}
                >
                  <MenuItem className={classes.menuItem}>
                    <Typography variant="body2" color="textSecondary">
                      {isOnAccountPage ? 'Currently on' : 'Signed in as'}
                    </Typography>
                    <Typography variant="body1" style={{ fontWeight: 600 }}>
                      {user?.name}
                    </Typography>
                  </MenuItem>
                  <MenuItem 
                    onClick={() => { 
                      handleUserMenuClose(); 
                      if (!isOnAccountPage) {
                        window.location.href = '/account'; 
                      }
                    }} 
                    className={classes.menuItem}
                    disabled={isOnAccountPage}
                    style={isOnAccountPage ? { opacity: 0.6, cursor: 'default' } : {}}
                  >
                    <Person className={classes.menuIcon} />
                    <Typography>
                      {isOnAccountPage ? 'My Account (Current)' : 'My Account'}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout} className={classes.menuItem}>
                    <ExitToApp className={classes.menuIcon} />
                    <Typography>Sign Out</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Person />}
                onClick={handleLoginClick}
                className={classes.loginButton}
              >
                Sign In
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {/* Login Dialog */}
      <Login
        open={loginOpen}
        onClose={handleLoginClose}
        onLogin={handleLogin}
        onSwitchToRegister={handleSwitchToRegister}
      />

      {/* Register Dialog */}
      <Register
        open={registerOpen}
        onClose={handleRegisterClose}
        onLogin={handleLogin}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
};

export default Navbar;
