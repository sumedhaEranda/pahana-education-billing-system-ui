import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';
import FormInput from './CustomTextField';

const AddressForm = ({ cart, test }) => {
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
  const methods = useForm();

  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => test({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address line 1" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="Zip / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted})` })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
