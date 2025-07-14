import React, { useState, useEffect } from 'react';
import { 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Grid, 
  Typography, 
  FormControl,
  Paper,
  Box,
  Chip,
  IconButton,
  Tooltip
} from '@material-ui/core';
import { 
  Home as HomeIcon,
  Business as BusinessIcon,
  LocalShipping as ShippingIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';
import FormInput from './CustomTextField';

const AddressForm = ({ cart, test, customer }) => {
  // Dummy countries data
  const [shippingCountries, setShippingCountries] = useState({
    'US': 'United States',
    'CA': 'Canada', 
    'UK': 'United Kingdom',
    'AU': 'Australia',
    'DE': 'Germany',
    'FR': 'France',
    'JP': 'Japan',
    'IN': 'India',
    'BR': 'Brazil',
    'MX': 'Mexico'
  });
  
  const [shippingCountry, setShippingCountry] = useState('US');
  
  // Dummy states/provinces data
  const [shippingSubdivisions, setShippingSubdivisions] = useState({
    'US': {
      'CA': 'California',
      'NY': 'New York', 
      'TX': 'Texas',
      'FL': 'Florida',
      'IL': 'Illinois',
      'PA': 'Pennsylvania',
      'OH': 'Ohio',
      'GA': 'Georgia',
      'NC': 'North Carolina',
      'MI': 'Michigan'
    },
    'CA': {
      'ON': 'Ontario',
      'QC': 'Quebec',
      'BC': 'British Columbia',
      'AB': 'Alberta',
      'MB': 'Manitoba'
    },
    'UK': {
      'ENG': 'England',
      'SCT': 'Scotland',
      'WLS': 'Wales',
      'NIR': 'Northern Ireland'
    }
  });
  
  const [shippingSubdivision, setShippingSubdivision] = useState('CA');
  
  // Dummy shipping options with different prices based on country
  const [shippingOptions, setShippingOptions] = useState([
    { 
      id: 'standard', 
      description: 'Standard Shipping (5-7 business days)', 
      price: { formatted: '$5.99', raw: 5.99 } 
    },
    { 
      id: 'express', 
      description: 'Express Shipping (2-3 business days)', 
      price: { formatted: '$12.99', raw: 12.99 } 
    },
    { 
      id: 'overnight', 
      description: 'Overnight Shipping (Next business day)', 
      price: { formatted: '$24.99', raw: 24.99 } 
    }
  ]);
  
  const [shippingOption, setShippingOption] = useState('standard');
  const [addressType, setAddressType] = useState('shipping');
  const [autofillStatus, setAutofillStatus] = useState('');
  const methods = useForm();
  const { reset, setValue } = methods;

  // Get address type icon
  const getAddressTypeIcon = (type) => {
    switch (type) {
      case 'shipping':
        return <ShippingIcon />;
      case 'billing':
        return <BusinessIcon />;
      case 'delivery':
        return <HomeIcon />;
      default:
        return <HomeIcon />;
    }
  };

  // Get address type color
  const getAddressTypeColor = (type) => {
    switch (type) {
      case 'shipping':
        return '#667eea';
      case 'billing':
        return '#764ba2';
      case 'delivery':
        return '#f093fb';
      default:
        return '#667eea';
    }
  };

  // Autofill logic for billing/delivery
  useEffect(() => {
    if (!customer) return;
    
    console.log('Address type changed to:', addressType);
    console.log('Customer data:', customer);
    
    let autofillMessage = '';
    
    if (addressType === 'billing' && customer.billingAddress) {
      console.log('Filling billing address:', customer.billingAddress);
      setValue('firstName', customer.name?.split(' ')[0] || '');
      setValue('lastName', customer.name?.split(' ').slice(1).join(' ') || '');
      setValue('address1', customer.billingAddress.street || '');
      setValue('city', customer.billingAddress.city || '');
      setValue('zip', customer.billingAddress.zip || '');
      setValue('email', customer.email || '');
      autofillMessage = 'Billing address autofilled successfully!';
    } else if (addressType === 'delivery' && customer.deliveryAddress) {
      console.log('Filling delivery address:', customer.deliveryAddress);
      setValue('firstName', customer.name?.split(' ')[0] || '');
      setValue('lastName', customer.name?.split(' ').slice(1).join(' ') || '');
      setValue('address1', customer.deliveryAddress.street || '');
      setValue('city', customer.deliveryAddress.city || '');
      setValue('zip', customer.deliveryAddress.zip || '');
      setValue('email', customer.email || '');
      autofillMessage = 'Delivery address autofilled successfully!';
    } else if (addressType === 'shipping' && customer.shippingAddress) {
      console.log('Filling shipping address:', customer.shippingAddress);
      setValue('firstName', customer.name?.split(' ')[0] || '');
      setValue('lastName', customer.name?.split(' ').slice(1).join(' ') || '');
      setValue('address1', customer.shippingAddress.street || '');
      setValue('city', customer.shippingAddress.city || '');
      setValue('zip', customer.shippingAddress.zip || '');
      setValue('email', customer.email || '');
      autofillMessage = 'Shipping address autofilled successfully!';
    } else {
      console.log('Clearing form fields');
      reset({
        firstName: '',
        lastName: '',
        address1: '',
        city: '',
        zip: '',
        email: ''
      });
      autofillMessage = 'Form cleared. Please fill in your details manually.';
    }
    
    setAutofillStatus(autofillMessage);
    
    // Clear status message after 3 seconds
    setTimeout(() => {
      setAutofillStatus('');
    }, 3000);
  }, [addressType, customer, setValue, reset]);

  const handleAddressTypeChange = (newType) => {
    setAddressType(newType);
  };

  return (
    <Paper elevation={3} style={{ padding: '24px', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
      <Box mb={3}>
        <Typography variant="h5" gutterBottom style={{ 
          fontWeight: '700',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Shipping Address
        </Typography>
        
        {/* Address Type Selection */}
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom style={{ fontWeight: '600', marginBottom: '12px' }}>
            Select Address Type
          </Typography>
          <Grid container spacing={2}>
            {[
              { value: 'shipping', label: 'Shipping Address', icon: <ShippingIcon /> },
              { value: 'billing', label: 'Billing Address', icon: <BusinessIcon /> },
              { value: 'delivery', label: 'Delivery Address', icon: <HomeIcon /> }
            ].map((type) => (
              <Grid item xs={12} sm={4} key={type.value}>
                <Paper
                  elevation={addressType === type.value ? 4 : 1}
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    border: addressType === type.value ? `2px solid ${getAddressTypeColor(type.value)}` : '2px solid transparent',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    backgroundColor: addressType === type.value ? `${getAddressTypeColor(type.value)}10` : 'white',
                    transform: addressType === type.value ? 'translateY(-2px)' : 'none'
                  }}
                  onClick={() => handleAddressTypeChange(type.value)}
                >
                  <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                    <Box 
                      style={{ 
                        color: getAddressTypeColor(type.value),
                        marginBottom: '8px'
                      }}
                    >
                      {type.icon}
                    </Box>
                    <Typography variant="body2" style={{ fontWeight: '600', textAlign: 'center' }}>
                      {type.label}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Autofill Status */}
        {autofillStatus && (
          <Box
            style={{ 
              marginBottom: '16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="body2" style={{ color: '#667eea', fontWeight: '500' }}>
              {autofillStatus}
            </Typography>
            <Tooltip title="Refresh autofill">
              <IconButton
                size="small"
                onClick={() => {
                  // Trigger autofill again
                  const currentType = addressType;
                  setAddressType('');
                  setTimeout(() => setAddressType(currentType), 100);
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => test({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address line 1" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="Zip / Postal code" />
            
            {/* Shipping Options */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel style={{ fontWeight: '600' }}>Shipping Country</InputLabel>
                <Select 
                  value={shippingCountry} 
                  fullWidth 
                  onChange={(e) => setShippingCountry(e.target.value)}
                  style={{ borderRadius: '12px' }}
                >
                  {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel style={{ fontWeight: '600' }}>Shipping Subdivision</InputLabel>
                <Select 
                  value={shippingSubdivision} 
                  fullWidth 
                  onChange={(e) => setShippingSubdivision(e.target.value)}
                  style={{ borderRadius: '12px' }}
                >
                  {shippingSubdivisions[shippingCountry] ? 
                    Object.entries(shippingSubdivisions[shippingCountry]).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
                      </MenuItem>
                    ))
                    :
                    <MenuItem value="">No states available</MenuItem>
                  }
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel style={{ fontWeight: '600' }}>Shipping Options</InputLabel>
                <Select 
                  value={shippingOption} 
                  fullWidth 
                  onChange={(e) => setShippingOption(e.target.value)}
                  style={{ borderRadius: '12px' }}
                >
                  {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted})` })).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          <Box mt={4} display="flex" justifyContent="space-between">
            <Button 
              component={Link} 
              variant="outlined" 
              to="/cart"
              style={{
                borderRadius: '12px',
                padding: '12px 24px',
                fontWeight: '600',
                borderColor: '#667eea',
                color: '#667eea'
              }}
            >
              Back to Cart
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              style={{
                borderRadius: '12px',
                padding: '12px 24px',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
              }}
            >
              Next
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default AddressForm;
