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
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../FireBase/firebase";
import { saveToken } from "../utils/tokenService";
import apiService from "../../lib/apiService";
import useStyles from "./styles";

const Login = ({ open, onClose, onLogin, onSwitchToRegister, onSwitchToReset }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Validation functions
  const validateUsername = (username) => username.length >= 3;
  const validatePassword = (password) => password.length >= 6;

  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = "Username is required";
    else if (!validateUsername(formData.username))
      errors.username = "Username must be at least 3 characters long";

    if (!formData.password) errors.password = "Password is required";
    else if (!validatePassword(formData.password))
      errors.password = "Password must be at least 6 characters long";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    if (formErrors[field]) setFormErrors({ ...formErrors, [field]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setFormErrors({});
    setVerifyEmail(false);

    try {
      const email = formData.username.includes("@")
        ? formData.username
        : `${formData.username}@example.com`;

      const response = await signInWithEmailAndPassword(auth, email, formData.password);
      console.log("Full Response:", response);

      
      console.log("Is Email Verified:", response.user.emailVerified);
      

      if (response.user) {
        if (response.user.emailVerified) {

          try {
            const updateResponse = await apiService.updatePassword(email, formData.password);
            console.log("Password update response:", updateResponse);
          } catch (err) {
            console.error("Password update failed:", err.message);
          
            return;
          }


          const backendResponse = await apiService.login({
            username: formData.username,
            password: formData.password,
            authType: "email",
            provider: "email",
            socialId: null,
          });

          if (backendResponse.token) saveToken(backendResponse.token);
          if (backendResponse.user_id) localStorage.setItem("userId", backendResponse.user_id);

          try {
            const accountNo = backendResponse.user_id || backendResponse.user?.id;
            if (accountNo) await apiService.createCart({ accountNo });
          } catch (err) {
            console.log("Cart creation failed:", err.message);
          }

          const loginData = {
            username: formData.username,
            password: formData.password,
            email: backendResponse.user?.email || email,
            firebaseUser: response.user,
            ...backendResponse,
          };

          onLogin && onLogin(loginData);
          onClose();
        } else {
          setVerifyEmail(true);
          setError("Please verify your email before signing in.");
        }
      }
    } catch (err) {
      console.error("Authentication error:", err);
      switch (err.code) {
        case "auth/user-not-found":
          
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;
        default:
          setError(err.message || "Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ username: "", password: "" });
    setError("");
    setFormErrors({});
    setLoading(false);
    setVerifyEmail(false);
    onClose();
  };

  const handleErrorClose = () => setError("");

  const handleSwitchToRegister = () => {
    handleClose();
    onSwitchToRegister && onSwitchToRegister();
  };

  const handleSwitchToReset = () => {
    handleClose();
    onSwitchToReset && onSwitchToReset();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Welcome Back</Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={handleInputChange("username")}
              variant="outlined"
              required
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

            <Box textAlign="right" mt={1}>
              <Button color="primary" size="small" onClick={handleSwitchToReset} disabled={loading}>
                Forgot Password?
              </Button>
            </Box>

            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
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
              <Button color="primary" onClick={handleSwitchToRegister} disabled={loading}>
                Sign Up
              </Button>
            </Typography>

            {verifyEmail && (
              <Box mt={2} p={2} bgcolor="warning.light" borderRadius={1}>
                <Typography variant="body2" color="warning.contrastText">
                  Email verification required. Please check your inbox.
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
          <Typography variant="body2">{error}</Typography>
        </Box>
      </Snackbar>
    </>
  );
};

export default Login;
