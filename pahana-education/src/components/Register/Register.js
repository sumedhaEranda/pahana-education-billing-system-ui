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
  Grid,
  Box,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../FireBase/firebase";
import { saveToken } from "../utils/tokenService";
import apiService from "../../lib/apiService";
import useStyles from "../Login/styles";

const Register = ({ open, onClose, onLogin, onSwitchToLogin }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    username: "",
    role: "USER",
    address: "",
    telephone: "",
  });

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const errors = {};

    // Username validation
    if (!formData.username) {
      errors.username = "Username is required";
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters long";
    }

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      errors.password = "Password must be at least 6 characters long";
    }

    // Registration specific validations
    if (!formData.firstName) {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName) {
      errors.lastName = "Last name is required";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
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
    setSuccess("");
    setFormErrors({});
    
    try {
      // Register with your backend API
      console.log("Registration attempt:", formData);
      const response = await apiService.register({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        role: "USER"
      });
      
      // Backend registration succeeded - call your function here
      console.log("Backend registration successful:", response);
      
      // Store JWT token if provided by backend
      if (response.token) {
        saveToken(response.token);
        console.log("JWT token saved after registration");
      }
      
      // Call your custom function when registration succeeds
      handleRegistrationSuccess(response);
      
      // Pass the registration data to the parent component
      const registrationData = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        ...response
      };
      
      onLogin && onLogin(registrationData);
      onClose();
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle successful registration
  const handleRegistrationSuccess = (response) => {
    console.log("Registration success handler called with:", response);
  
    // Create Firebase user only after backend registration succeeds
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Firebase user created:", user);
  
        // Send verification email
        sendEmailVerification(user)
          .then(() => {
            alert("Verification email sent!");
            setSuccess("Account created successfully! Please check your email for verification.");
          })
          .catch((error) => {
            console.error("Email verification error:", error);
            setError("Account created but verification email failed to send.");
          });
  
        // Optional: navigate user to home page
        // navigate("/home");
  
      })
      .catch((error) => {
        console.error("Firebase auth error:", error);
  
        // Handle Firebase Auth errors properly
        if (error.code === 'auth/email-already-in-use') {
          setError("An account with this email already exists in Firebase.");
        } else if (error.code === 'auth/weak-password') {
          setError("Password is too weak for Firebase.");
        } else if (error.code === 'auth/invalid-email') {
          setError("Invalid email format for Firebase.");
        } else {
          setError("Firebase authentication failed: " + error.message);
        }
      });
  };
  

  const handleClose = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      username: "",
      role: "USER",
      address: "",
      telephone: "",
    });
    setError("");
    setSuccess("");
    setFormErrors({});
    setLoading(false);
    onClose();
  };

  const handleErrorClose = () => {
    setError("");
  };

  const handleSuccessClose = () => {
    setSuccess("");
  };

  const handleSwitchToLogin = () => {
    handleClose();
    onSwitchToLogin && onSwitchToLogin();
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
              Create Account
            </Typography>
            <IconButton onClick={handleClose} className={classes.closeButton}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent className={classes.dialogContent}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  variant="outlined"
                  required
                  className={classes.textField}
                  disabled={loading}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange("lastName")}
                  variant="outlined"
                  required
                  className={classes.textField}
                  disabled={loading}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={handleInputChange("username")}
              variant="outlined"
              required
              className={classes.textField}
              style={{ marginTop: "16px" }}
              disabled={loading}
              error={!!formErrors.username}
              helperText={formErrors.username}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              variant="outlined"
              required
              className={classes.textField}
              style={{ marginTop: "16px" }}
              disabled={loading}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />

            <TextField
              fullWidth
              label="Address"
              value={formData.address}
              onChange={handleInputChange("address")}
              variant="outlined"
              className={classes.textField}
              style={{ marginTop: "16px" }}
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Telephone"
              value={formData.telephone}
              onChange={handleInputChange("telephone")}
              variant="outlined"
              className={classes.textField}
              style={{ marginTop: "16px" }}
              disabled={loading}
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

            <TextField
              fullWidth
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              variant="outlined"
              required
              className={classes.textField}
              style={{ marginTop: "16px" }}
              disabled={loading}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
            />

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
                {loading ? "Processing..." : "Create Account"}
              </Button>
            </DialogActions>
          </form>

          <Box textAlign="center" style={{ marginTop: "16px" }}>
            <Typography variant="body2" color="textSecondary">
              Already have an account?{" "}
              <Button
                color="primary"
                onClick={handleSwitchToLogin}
                className={classes.toggleButton}
                disabled={loading}
              >
                Sign In
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

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box
          bgcolor="success.main"
          color="success.contrastText"
          px={2}
          py={1}
          borderRadius={1}
          display="flex"
          alignItems="center"
        >
          <Typography variant="body2">
            {success}
          </Typography>
        </Box>
      </Snackbar>
    </>
  );
};

export default Register; 