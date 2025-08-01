import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';
import apiService from '../../../lib/apiService';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [customer, setCustomer] = useState(null);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const fetchCustomer = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const data = await apiService.getCustomer(userId);
          setCustomer(data);
        } catch (err) {
          setCustomer(null);
        }
      }
    };
    fetchCustomer();
  }, []);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const test = (data) => {
    setShippingData(data);
    nextStep();
  };

  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <div style={{ 
          height: "1px", 
          backgroundColor: "#e0e0e0", 
          margin: "16px 0",
          width: "100%" 
        }} />
        <Typography variant="subtitle2">Order ID: {order.id}</Typography>
        <Typography variant="subtitle2">Order Date: {new Date(order.created_at).toLocaleDateString()}</Typography>
        <Typography variant="subtitle2">Payment Method: {order.payment?.method || 'Credit Card'}</Typography>
        <Typography variant="subtitle2">Shipping Address: {order.shipping?.street}, {order.shipping?.town_city}, {order.shipping?.county_state} {order.shipping?.postal_zip_code}</Typography>
        <Typography variant="subtitle2">Total Amount: {order.total?.formatted}</Typography>
        <Typography variant="subtitle2">Status: {order.status}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }

  const Form = () => (activeStep === 0
    ? <AddressForm cart={cart} test={test} customer={customer} />
    : <PaymentForm cart={cart} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />);

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout; 