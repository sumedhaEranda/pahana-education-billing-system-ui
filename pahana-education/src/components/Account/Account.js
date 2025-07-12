import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Snackbar
} from '@material-ui/core';
import {
  Person,
  Email,
  Edit,
  Save,
  Cancel,
  ShoppingCart,
  Book,
  History
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import apiService from '../../lib/apiService';
import useStyles from './styles';

// Add these constants for address fields
const emptyAddress = {
  street: '',
  city: '',
  state: '',
  zip: '',
  country: ''
};

const Account = () => {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [billingEditMode, setBillingEditMode] = useState(false);
  const [deliveryEditMode, setDeliveryEditMode] = useState(false);
  const [billingAddress, setBillingAddress] = useState(emptyAddress);
  const [deliveryAddress, setDeliveryAddress] = useState(emptyAddress);
  const [billingEditData, setBillingEditData] = useState(emptyAddress);
  const [deliveryEditData, setDeliveryEditData] = useState(emptyAddress);
  const [telephone, setTelephone] = useState('');
  const [userId, setUserId] = useState(null);

  // Fetch customer data from backend on mount
  useEffect(() => {
    if (!apiService.isAuthenticated()) {
      history.push('/');
      return;
    }
    // Get user_id from login response (store in localStorage on login)
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('No user ID found. Please log in again.');
      setLoading(false);
      return;
    }
    setUserId(userId);
    apiService.getCustomer(userId)
      .then((customer) => {
        setUser({
          name: customer.name || '',
          email: customer.username || '',
          username: customer.username || '',
          role: customer.role || 'USER',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name || customer.username)}&background=667eea&color=fff`,
          joinDate: localStorage.getItem('userJoinDate') || new Date().toLocaleDateString(),
          authType: 'email',
          provider: 'email'
        });
        setEditData({
          name: customer.name || '',
          email: customer.username || '',
          username: customer.username || ''
        });
        setTelephone(customer.telephone || '');
        setBillingAddress(customer.billingAddress || emptyAddress);
        setDeliveryAddress(customer.deliveryAddress || emptyAddress);
        setBillingEditData(customer.billingAddress || emptyAddress);
        setDeliveryEditData(customer.deliveryAddress || emptyAddress);
        // Save to localStorage for persistence
        localStorage.setItem('userName', customer.name || '');
        localStorage.setItem('userEmail', customer.username || '');
        localStorage.setItem('userUsername', customer.username || '');
        localStorage.setItem('billingAddress', JSON.stringify(customer.billingAddress || emptyAddress));
        localStorage.setItem('deliveryAddress', JSON.stringify(customer.deliveryAddress || emptyAddress));
      })
      .catch((err) => {
        setError('Failed to load account information');
      })
      .finally(() => setLoading(false));
  }, [history]);

  useEffect(() => {
    // Load addresses from localStorage
    const billing = JSON.parse(localStorage.getItem('billingAddress') || 'null') || emptyAddress;
    const delivery = JSON.parse(localStorage.getItem('deliveryAddress') || 'null') || emptyAddress;
    setBillingAddress(billing);
    setDeliveryAddress(delivery);
    setBillingEditData(billing);
    setDeliveryEditData(delivery);
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      email: user.email,
      username: user.username
    });
    setEditMode(false);
  };

  // Save account info (name, telephone)
  const handleSave = async () => {
    try {
      setLoading(true);
      const token = apiService.getAuthToken();
      const accountNo = userId;
      const updateData = {
        accountNo: Number(accountNo),
        name: editData.name,
        telephone: telephone,
        billingAddress: billingAddress,
        deliveryAddress: deliveryAddress
      };
      await apiService.updateCustomer(accountNo, updateData, token);
      setUser({ ...user, name: editData.name });
      localStorage.setItem('userName', editData.name);
      setEditMode(false);
      setSuccess('Account updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to update account information');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field) => (event) => {
    setEditData({
      ...editData,
      [field]: event.target.value
    });
  };

  // Billing address handlers
  const handleBillingEdit = () => setBillingEditMode(true);
  const handleBillingCancel = () => {
    setBillingEditData(billingAddress);
    setBillingEditMode(false);
  };
  const handleBillingChange = (field) => (e) => {
    setBillingEditData({ ...billingEditData, [field]: e.target.value });
  };
  // Save billing address
  const handleBillingSave = async () => {
    try {
      setLoading(true);
      const token = apiService.getAuthToken();
      const accountNo = userId;
      const updateData = {
        accountNo: Number(accountNo),
        name: user.name,
        telephone: telephone,
        billingAddress: billingEditData,
        deliveryAddress: deliveryAddress
      };
      await apiService.updateCustomer(accountNo, updateData, token);
      setBillingAddress(billingEditData);
      localStorage.setItem('billingAddress', JSON.stringify(billingEditData));
      setBillingEditMode(false);
      setSuccess('Billing address updated!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to update billing address');
    } finally {
      setLoading(false);
    }
  };

  // Delivery address handlers
  const handleDeliveryEdit = () => setDeliveryEditMode(true);
  const handleDeliveryCancel = () => {
    setDeliveryEditData(deliveryAddress);
    setDeliveryEditMode(false);
  };
  const handleDeliveryChange = (field) => (e) => {
    setDeliveryEditData({ ...deliveryEditData, [field]: e.target.value });
  };
  // Save delivery address
  const handleDeliverySave = async () => {
    try {
      setLoading(true);
      const token = apiService.getAuthToken();
      const accountNo = userId;
      const updateData = {
        accountNo: Number(accountNo),
        name: user.name,
        telephone: telephone,
        billingAddress: billingAddress,
        deliveryAddress: deliveryEditData
      };
      await apiService.updateCustomer(accountNo, updateData, token);
      setDeliveryAddress(deliveryEditData);
      localStorage.setItem('deliveryAddress', JSON.stringify(deliveryEditData));
      setDeliveryEditMode(false);
      setSuccess('Delivery address updated!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to update delivery address');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear all localStorage data
    localStorage.clear();
    apiService.logout();
    history.push('/');
    window.location.reload();
  };

  if (loading) {
    return (
      <Container className={classes.loadingContainer}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: 16 }}>
          Loading account information...
        </Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className={classes.errorContainer}>
        <Typography variant="h6" color="error">
          Failed to load account information
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => history.push('/')}
          style={{ marginTop: 16 }}
        >
          Go Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        My Account
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Paper className={classes.profileCard}>
            <Box display="flex" flexDirection="column" alignItems="center" p={3}>
              <Avatar 
                src={user.avatar} 
                className={classes.avatar}
                alt={user.name}
              >
                {user.name?.charAt(0)}
              </Avatar>
              <Typography variant="h5" className={classes.userName}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {user.role}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Member since {user.joinDate}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Account Details */}
        <Grid item xs={12} md={8}>
          <Paper className={classes.detailsCard}>
            <Box p={3}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                  Account Details
                </Typography>
                {!editMode ? (
                  <Button
                    startIcon={<Edit />}
                    onClick={handleEdit}
                    color="primary"
                    variant="outlined"
                  >
                    Edit
                  </Button>
                ) : (
                  <Box>
                    <Button
                      startIcon={<Save />}
                      onClick={handleSave}
                      color="primary"
                      variant="contained"
                      style={{ marginRight: 8 }}
                      disabled={loading}
                    >
                      Save
                    </Button>
                    <Button
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      variant="outlined"
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </Box>

              <Divider style={{ marginBottom: 24 }} />

              <Grid container spacing={3}>
                {/* Account Number */}
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Person className={classes.fieldIcon} />
                    <Typography variant="body2" color="textSecondary" style={{ marginLeft: 8 }}>
                      Account Number
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    {userId}
                  </Typography>
                </Grid>
                {/* Full Name */}
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Person className={classes.fieldIcon} />
                    <Typography variant="body2" color="textSecondary" style={{ marginLeft: 8 }}>
                      Full Name
                    </Typography>
                  </Box>
                  {editMode ? (
                    <TextField
                      fullWidth
                      value={editData.name}
                      onChange={handleInputChange('name')}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography variant="body1">
                      {user.name}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Person className={classes.fieldIcon} />
                    <Typography variant="body2" color="textSecondary" style={{ marginLeft: 8 }}>
                      Username
                    </Typography>
                  </Box>
                  {editMode ? (
                    <TextField
                      fullWidth
                      value={editData.username}
                      onChange={handleInputChange('username')}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography variant="body1">
                      {user.username}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Email className={classes.fieldIcon} />
                    <Typography variant="body2" color="textSecondary" style={{ marginLeft: 8 }}>
                      Email Address
                    </Typography>
                  </Box>
                  {editMode ? (
                    <TextField
                      fullWidth
                      value={editData.email}
                      onChange={handleInputChange('email')}
                      variant="outlined"
                      size="small"
                      type="email"
                    />
                  ) : (
                    <Typography variant="body1">
                      {user.email}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Person className={classes.fieldIcon} />
                    <Typography variant="body2" color="textSecondary" style={{ marginLeft: 8 }}>
                      Telephone
                    </Typography>
                  </Box>
                  {editMode ? (
                    <TextField
                      fullWidth
                      value={telephone}
                      onChange={e => setTelephone(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography variant="body1">{telephone}</Typography>
                  )}
                </Grid>
              </Grid>

              <Divider style={{ margin: '32px 0' }} />
              <Grid container spacing={3}>
                {/* Billing Address */}
                <Grid item xs={12} md={6}>
                  <Paper className={classes.detailsCard}>
                    <Box p={3}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Billing Address</Typography>
                        {!billingEditMode ? (
                          <Button startIcon={<Edit />} onClick={handleBillingEdit} color="primary" variant="outlined">Edit</Button>
                        ) : (
                          <Box>
                            <Button startIcon={<Save />} onClick={handleBillingSave} color="primary" variant="contained" style={{ marginRight: 8 }}>Save</Button>
                            <Button startIcon={<Cancel />} onClick={handleBillingCancel} variant="outlined">Cancel</Button>
                          </Box>
                        )}
                      </Box>
                      <Divider style={{ marginBottom: 24 }} />
                      {['street', 'city', 'state', 'zip', 'country'].map((field) => (
                        <Box mb={2} key={field}>
                          <Typography variant="body2" color="textSecondary" style={{ marginBottom: 4, textTransform: 'capitalize' }}>{field}</Typography>
                          {billingEditMode ? (
                            <TextField
                              fullWidth
                              value={billingEditData[field]}
                              onChange={handleBillingChange(field)}
                              variant="outlined"
                              size="small"
                            />
                          ) : (
                            <Typography variant="body1">{billingAddress[field]}</Typography>
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
                {/* Delivery Address */}
                <Grid item xs={12} md={6}>
                  <Paper className={classes.detailsCard}>
                    <Box p={3}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Delivery Address</Typography>
                        {!deliveryEditMode ? (
                          <Button startIcon={<Edit />} onClick={handleDeliveryEdit} color="primary" variant="outlined">Edit</Button>
                        ) : (
                          <Box>
                            <Button startIcon={<Save />} onClick={handleDeliverySave} color="primary" variant="contained" style={{ marginRight: 8 }}>Save</Button>
                            <Button startIcon={<Cancel />} onClick={handleDeliveryCancel} variant="outlined">Cancel</Button>
                          </Box>
                        )}
                      </Box>
                      <Divider style={{ marginBottom: 24 }} />
                      {['street', 'city', 'state', 'zip', 'country'].map((field) => (
                        <Box mb={2} key={field}>
                          <Typography variant="body2" color="textSecondary" style={{ marginBottom: 4, textTransform: 'capitalize' }}>{field}</Typography>
                          {deliveryEditMode ? (
                            <TextField
                              fullWidth
                              value={deliveryEditData[field]}
                              onChange={handleDeliveryChange(field)}
                              variant="outlined"
                              size="small"
                            />
                          ) : (
                            <Typography variant="body1">{deliveryAddress[field]}</Typography>
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              <Divider style={{ margin: '24px 0' }} />

              {/* Authentication Info */}
              <Typography variant="h6" gutterBottom>
                Authentication Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">
                    Authentication Type
                  </Typography>
                  <Typography variant="body1">
                    {user.authType === 'email' ? 'Email/Password' : 'Social Login'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">
                    Provider
                  </Typography>
                  <Typography variant="body1">
                    {user.provider === 'email' ? 'Email' : user.provider}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper className={classes.actionsCard}>
            <Box p={3}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ShoppingCart />}
                    onClick={() => history.push('/cart')}
                  >
                    View Cart
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Book />}
                    onClick={() => history.push('/')}
                  >
                    Browse Books
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<History />}
                    onClick={() => history.push('/orders')}
                  >
                    Order History
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Success/Error Messages */}
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box
          bgcolor="success.main"
          color="success.contrastText"
          px={2}
          py={1}
          borderRadius={1}
        >
          <Typography variant="body2">
            {success}
          </Typography>
        </Box>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box
          bgcolor="error.main"
          color="error.contrastText"
          px={2}
          py={1}
          borderRadius={1}
        >
          <Typography variant="body2">
            {error}
          </Typography>
        </Box>
      </Snackbar>
    </Container>
  );
};

export default Account; 