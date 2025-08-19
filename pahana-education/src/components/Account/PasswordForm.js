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
import { Close, CheckCircle } from "@material-ui/icons";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../FireBase/firebase";

// mode: 'reset' | 'change'
const PasswordForm = ({ open, onClose, mode = 'reset', onSwitchToLogin }) => {
  // Shared UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Reset-by-email state
  const [identifier, setIdentifier] = useState(""); // email address

  // Change/direct reset state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCloseDialog = () => {
    setIdentifier("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setMessage("");
    onClose && onClose();
  };

  // Send password reset email via Firebase
  const handleSendResetEmail = async () => {
    const email = identifier.trim();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // very light validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (err) {
      console.error(err);
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with that email.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/too-many-requests":
          setError("Too many requests. Please try again later.");
          break;
        default:
          setError(err.message || "Failed to send reset email.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Change password for signed-in user
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        setError("Please sign in again to change your password.");
        return;
      }
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setMessage("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      switch (err.code) {
        case "auth/wrong-password":
          setError("The current password is incorrect.");
          break;
        case "auth/requires-recent-login":
          setError("Please sign in again and then try updating your password.");
          break;
        case "auth/weak-password":
          setError("New password is too weak.");
          break;
        default:
          setError(err.message || "Failed to update password.");
      }
    } finally {
      setLoading(false);
    }
  };

  const title = mode === 'change' ? 'Change Password' : 'Reset Password';

  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">{title}</Typography>
            <IconButton onClick={handleCloseDialog} disabled={loading}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {mode === 'change' ? (
            <>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                variant="outlined"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{ marginTop: 8 }}
                disabled={loading}
              />
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ marginTop: 16 }}
                disabled={loading}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ marginTop: 16 }}
                disabled={loading}
                error={!!error}
                helperText={error}
              />
            </>
          ) : (
            <>
              <Typography variant="body2" gutterBottom>
                Enter your email to receive a password reset link.
              </Typography>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (error) setError("");
                }}
                variant="outlined"
                style={{ marginTop: 16, marginBottom: 8 }}
                disabled={loading}
                error={!!error}
                helperText={error}
              />
            </>
          )}
        </DialogContent>
        <DialogActions style={{ padding: '16px 24px', flexDirection: 'column', gap: '8px' }}>
          {mode === 'change' ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleChangePassword}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSendResetEmail}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {loading ? "Sending..." : "Send Reset Email"}
              </Button>
              {onSwitchToLogin && (
                <Button
                  color="secondary"
                  fullWidth
                  onClick={() => {
                    handleCloseDialog();
                    onSwitchToLogin();
                  }}
                  disabled={loading}
                  variant="outlined"
                >
                  Back to Login
                </Button>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={() => setMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Box 
          bgcolor="success.main" 
          color="success.contrastText" 
          px={2} 
          py={1} 
          borderRadius={1}
          display="flex"
          alignItems="center"
          gap={1}
        >
          <CheckCircle fontSize="small" />
          <Typography variant="body2">{message}</Typography>
        </Box>
      </Snackbar>
    </>
  );
};

export default PasswordForm;


