import React, { useState, useEffect } from 'react';
import { 
  CssBaseline, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  Typography, 
  CircularProgress, 
  Button,
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { 
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  ShoppingCart as CartIcon,
  Payment as PaymentIcon
} from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';

import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, onCaptureCheckout, order, error, customer }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();
  const history = useHistory();

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const test = (data) => {
    setShippingData(data);
    nextStep();
  };

  // Get step icon
  const getStepIcon = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <CartIcon />;
      case 1:
        return <PaymentIcon />;
      default:
        return <CartIcon />;
    }
  };

  let Confirmation = () => (order.customer ? (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ 
        padding: '32px', 
        borderRadius: '20px', 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        textAlign: 'center'
      }}>
        <Box mb={3}>
          <CheckCircleIcon style={{ 
            fontSize: '64px', 
            color: '#38a169',
            marginBottom: '16px'
          }} />
          <Typography variant="h4" gutterBottom style={{ 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Thank you for your purchase!
          </Typography>
          <Typography variant="h6" style={{ color: '#4a5568', marginBottom: '24px' }}>
            {order.customer.firstname} {order.customer.lastname}
          </Typography>
        </Box>

        <Box 
          style={{ 
            backgroundColor: 'rgba(56, 161, 105, 0.1)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" style={{ fontWeight: '600', color: '#2d3748' }}>
                Order ID
              </Typography>
              <Typography variant="body1" style={{ color: '#4a5568' }}>
                {order.id}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" style={{ fontWeight: '600', color: '#2d3748' }}>
                Order Date
              </Typography>
              <Typography variant="body1" style={{ color: '#4a5568' }}>
                {new Date(order.created_at).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" style={{ fontWeight: '600', color: '#2d3748' }}>
                Payment Method
              </Typography>
              <Typography variant="body1" style={{ color: '#4a5568' }}>
                {order.payment?.method || 'Credit Card'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" style={{ fontWeight: '600', color: '#2d3748' }}>
                Total Amount
              </Typography>
              <Typography variant="body1" style={{ color: '#4a5568', fontWeight: '600' }}>
                {order.total?.formatted}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" style={{ fontWeight: '600', color: '#2d3748' }}>
                Shipping Address
              </Typography>
              <Typography variant="body1" style={{ color: '#4a5568' }}>
                {order.shipping?.street}, {order.shipping?.town_city}, {order.shipping?.county_state} {order.shipping?.postal_zip_code}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" style={{ fontWeight: '600', color: '#2d3748' }}>
                Status
              </Typography>
              <Typography variant="body1" style={{ 
                color: '#38a169', 
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                {order.status}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Button 
          component={Link} 
          variant="contained" 
          to="/" 
          style={{
            borderRadius: '12px',
            padding: '12px 32px',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
          }}
        >
          Back to Home
        </Button>
      </Paper>
    </Container>
  ) : (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
      <CircularProgress size={60} style={{ color: '#667eea' }} />
    </Box>
  ));

  if (error) {
    Confirmation = () => (
      <Container maxWidth="md">
        <Paper elevation={3} style={{ 
          padding: '32px', 
          borderRadius: '20px', 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          textAlign: 'center'
        }}>
          <Box mb={3}>
            <ErrorIcon style={{ 
              fontSize: '64px', 
              color: '#e53e3e',
              marginBottom: '16px'
            }} />
            <Typography variant="h4" gutterBottom style={{ 
              fontWeight: '700',
              color: '#e53e3e'
            }}>
              Checkout Error
            </Typography>
          </Box>

          <Box
            style={{ 
              marginBottom: '24px',
              borderRadius: '12px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              padding: '16px'
            }}
          >
            <Typography variant="body1" style={{ color: '#e53e3e', fontWeight: '500' }}>
              {error}
            </Typography>
          </Box>

          <Button 
            component={Link} 
            variant="contained" 
            to="/" 
            style={{
              borderRadius: '12px',
              padding: '12px 32px',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
            }}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    );
  }

  const Form = () => (activeStep === 0
    ? <AddressForm cart={cart} nextStep={nextStep} setShippingData={setShippingData} test={test} customer={customer} />
    : <PaymentForm cart={cart} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />);

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper} style={{ borderRadius: '20px' }}>
          <Typography variant="h4" align="center" style={{ 
            marginBottom: '32px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Checkout
          </Typography>
          
          <Stepper 
            activeStep={activeStep} 
            className={classes.stepper}
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '16px',
              padding: '24px'
            }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel 
                  icon={getStepIcon(index)}
                  style={{ 
                    color: activeStep >= index ? '#667eea' : '#a0aec0'
                  }}
                >
                  {label}
                </StepLabel>
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
