import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import apiService from "../../lib/apiService";
import useStyles from "./styles";

const Login = ({ open, onClose, onLogin, onSwitchToRegister }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Validation functions
  const validateUsername = (username) => {
    return username.length >= 3;
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const errors = {};

    // Username validation
    if (!formData.username) {
      errors.username = "Username is required";
    } else if (!validateUsername(formData.username)) {
      errors.username = "Username must be at least 3 characters long";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      errors.password = "Password must be at least 6 characters long";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      [field]: value,
    });
    
    // Clear field-specific error when user starts typing
    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: ""
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");
    setFormErrors({});
    
    try {
      // Handle login
      console.log("Login attempt:", { username: formData.username, password: formData.password });
      const response = await apiService.login({
        username: formData.username,
        password: formData.password,
        authType: 'email',
        provider: 'email',
        socialId: null
      });
      // Store userId for account API usage
      if (response.user_id) {
        localStorage.setItem('userId', response.user_id);
      }
      // Do NOT store token in localStorage
      // Pass the login data to the parent component
      const loginData = {
        username: formData.username,
        password: formData.password,
        email: response.user?.email || '',
        ...response
      };
      onLogin && onLogin(loginData);
      onClose();
    } catch (error) {
      console.error("Authentication error:", error);
      setError(error.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      username: "",
      password: "",
    });
    setError("");
    setFormErrors({});
    setLoading(false);
    onClose();
  };

  const handleErrorClose = () => {
    setError("");
  };

  const handleSwitchToRegister = () => {
    handleClose();
    onSwitchToRegister && onSwitchToRegister();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        className={`${classes.dialog} scale-in`}
      >
        <DialogTitle className={classes.dialogTitle}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" className={classes.title}>
              Welcome Back
            </Typography>
            <IconButton onClick={handleClose} className={classes.closeButton}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent className={classes.dialogContent}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              type="text"
              value={formData.username}
              onChange={handleInputChange("username")}
              variant="outlined"
              required
              className={classes.textField}
              disabled={loading}
              error={!!formErrors.username}
              helperText={formErrors.username}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange("password")}
              variant="outlined"
              required
              className={classes.textField}
              style={{ marginTop: "16px" }}
              disabled={loading}
              error={!!formErrors.password}
              helperText={formErrors.password}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={loading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            <Typography
              variant="body2"
              className={classes.forgotPassword}
              style={{ marginTop: "8px", textAlign: "right" }}
            >
              <Button color="primary" size="small" disabled={loading}>
                Forgot Password?
              </Button>
            </Typography>

            <DialogActions className={classes.dialogActions}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                className={classes.submitButton}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {loading ? "Processing..." : "Sign In"}
              </Button>
            </DialogActions>
          </form>

          <Box textAlign="center" style={{ marginTop: "16px" }}>
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{" "}
              <Button
                color="primary"
                onClick={handleSwitchToRegister}
                className={classes.toggleButton}
                disabled={loading}
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box
          bgcolor="error.main"
          color="error.contrastText"
          px={2}
          py={1}
          borderRadius={1}
          display="flex"
          alignItems="center"
        >
          <Typography variant="body2">
            {error}
          </Typography>
        </Box>
      </Snackbar>
    </>
  );
};

export default Login; 