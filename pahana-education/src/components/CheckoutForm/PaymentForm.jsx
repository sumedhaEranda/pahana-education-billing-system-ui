import React, { useState } from "react";
import { 
  Typography, 
  Button, 
  Grid, 
  TextField, 
  Paper, 
  Box, 
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { 
  CreditCard as CreditCardIcon,
  Payment as PaymentIcon,
  Security as SecurityIcon,
  LocalShipping as DeliveryIcon,
  AttachMoney as CashIcon
} from "@material-ui/icons";
import { useForm, FormProvider } from "react-hook-form";

import Review from "./Review";
import PaymentApiService from "../../lib/paymentApiService";

const PaymentForm = ({
  cart,
  nextStep,
  backStep,
  shippingData,
  onCaptureCheckout,
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const methods = useForm();

  // Payment methods with Cash on Delivery option
  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCardIcon />, color: '#667eea' },
    { id: 'cash', name: 'Cash on Delivery', icon: <CashIcon />, color: '#38a169' }
  ];

  // Calculate total with shipping
  const getTotal = () => {
    const shippingOptions = {
      'standard': 5.99,
      'express': 12.99,
      'overnight': 24.99
    };
    
    const shippingCost = shippingOptions[shippingData?.shippingOption] || 0;
    return cart.subtotal.raw + shippingCost;
  };

  // Payment validation based on method
  const validatePayment = () => {
    if (paymentMethod === 'card') {
      if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
        alert('Please fill in all card details');
        return false;
      }
      
      // Basic card number validation (13-19 digits)
      if (cardNumber.length < 13 || cardNumber.length > 19) {
        alert('Please enter a valid card number (13-19 digits)');
        return false;
      }
      
      // Basic CVV validation (3-4 digits)
      if (cvv.length < 3 || cvv.length > 4) {
        alert('Please enter a valid CVV (3-4 digits)');
        return false;
      }

      // Basic expiry date validation (MMYY format)
      if (expiryDate.length !== 4) {
        alert('Please enter expiry date in MMYY format (e.g., 1225)');
        return false;
      }

      const month = parseInt(expiryDate.substring(0, 2));
      const year = parseInt(expiryDate.substring(2, 4));
      
      if (month < 1 || month > 12) {
        alert('Please enter a valid month (01-12)');
        return false;
      }

      // Check if card is not expired (basic check)
      const currentYear = new Date().getFullYear() % 100; // Get last 2 digits
      const currentMonth = new Date().getMonth() + 1; // January is 0
      
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        alert('Card appears to be expired. Please check the expiry date.');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validatePayment()) return;

    setIsProcessing(true);

    try {
      // Get selected items from localStorage
      const selectedItemsJson = localStorage.getItem('selectedCartItems');
      const selectedItemIds = selectedItemsJson ? JSON.parse(selectedItemsJson) : null;
      
      console.log('Selected items for checkout:', selectedItemIds);

      // Generate bill data using the payment API service with selected items
      const billData = PaymentApiService.generateBillData(cart, shippingData, paymentMethod, selectedItemIds);
      
      console.log('Sending bill data to API:', billData);

      // Call the payment API to create the bill
      const response = await PaymentApiService.createBill(billData);
      
      console.log('Payment API response:', response);

      // Filter cart items to only include selected items for order data
      const selectedLineItems = selectedItemIds 
        ? cart.line_items.filter(item => selectedItemIds.includes(item.id))
        : cart.line_items;

      // Create order data for the existing checkout flow
      const orderData = {
        line_items: selectedLineItems, // Only selected items
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "International",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: paymentMethod,
          method: paymentMethod === 'cash' ? 'Cash on Delivery' : 'Credit Card',
          card_last4: paymentMethod === 'card' ? cardNumber.slice(-4) : null,
        },
        // Add the bill response data
        billId: response.id || response.billId,
        orderId: billData.orderId,
        paymentType: billData.paymentType
      };

      // Call the existing checkout capture function
      onCaptureCheckout(cart.id, orderData);
      setIsProcessing(false);
      nextStep();
      
      // Clear selected items from localStorage after successful checkout
      localStorage.removeItem('selectedCartItems');
      
    } catch (error) {
      console.error('Payment processing error:', error);
      alert(`Payment processing failed: ${error.message}`);
      setIsProcessing(false);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '24px', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
      <Review cart={cart} shippingData={shippingData} />
      
      <Box 
        style={{ 
          height: "2px", 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
          margin: "32px 0",
          borderRadius: "1px"
        }} 
      />
      
      <Typography variant="h5" gutterBottom style={{ 
        fontWeight: '700',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '24px'
      }}>
        Payment Method
      </Typography>
      
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          {/* Payment Method Selection */}
          <Box mb={3}>
            <Typography variant="subtitle1" gutterBottom style={{ fontWeight: '600', marginBottom: '16px' }}>
              Select Payment Method
            </Typography>
            <Grid container spacing={2}>
              {paymentMethods.map((method) => (
                <Grid item xs={12} sm={6} key={method.id}>
                  <Paper
                    elevation={paymentMethod === method.id ? 4 : 1}
                    style={{
                      padding: '20px',
                      cursor: 'pointer',
                      border: paymentMethod === method.id ? `2px solid ${method.color}` : '2px solid transparent',
                      borderRadius: '16px',
                      transition: 'all 0.3s ease',
                      backgroundColor: paymentMethod === method.id ? `${method.color}10` : 'white',
                      transform: paymentMethod === method.id ? 'translateY(-2px)' : 'none',
                      minHeight: '120px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                      <Box 
                        style={{ 
                          color: method.color,
                          marginBottom: '12px',
                          fontSize: '32px'
                        }}
                      >
                        {method.icon}
                      </Box>
                      <Typography variant="h6" style={{ fontWeight: '700', textAlign: 'center', color: method.color }}>
                        {method.name}
                      </Typography>
                      {method.id === 'cash' && (
                        <Typography variant="body2" style={{ textAlign: 'center', color: '#4a5568', marginTop: '8px' }}>
                          Pay when you receive your order
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Card Details Form */}
          {paymentMethod === 'card' && (
            <Box mb={3}>
              <Typography variant="subtitle1" gutterBottom style={{ fontWeight: '600', marginBottom: '16px' }}>
                Card Details
              </Typography>
              
              <Box
                style={{ 
                  marginBottom: '20px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  padding: '16px'
                }}
              >
                <Typography variant="body2" style={{ color: '#667eea' }}>
                  For testing, you can use any valid-looking card details. Examples: 4111111111111111 (Visa), 5555555555554444 (Mastercard), 378282246310005 (Amex)
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Cardholder Name"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    variant="outlined"
                    style={{ borderRadius: '12px' }}
                    InputProps={{
                      style: {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                    placeholder="1234 5678 9012 3456"
                    variant="outlined"
                    style={{ borderRadius: '12px' }}
                    InputProps={{
                      style: {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    label="Expiry Date"
                    value={expiryDate}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setExpiryDate(value);
                    }}
                    placeholder="MMYY (e.g., 1225)"
                    variant="outlined"
                    style={{ borderRadius: '12px' }}
                    InputProps={{
                      style: {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    label="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="123"
                    variant="outlined"
                    style={{ borderRadius: '12px' }}
                    InputProps={{
                      style: {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)'
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Cash on Delivery Information */}
          {paymentMethod === 'cash' && (
            <Box mb={3}>
              <Typography variant="subtitle1" gutterBottom style={{ fontWeight: '600', marginBottom: '16px' }}>
                Cash on Delivery Details
              </Typography>
              <Box
                style={{ 
                  borderRadius: '12px',
                  backgroundColor: 'rgba(56, 161, 105, 0.1)',
                  border: '1px solid rgba(56, 161, 105, 0.2)',
                  padding: '20px'
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <CashIcon style={{ color: '#38a169', marginRight: '12px', fontSize: '24px' }} />
                  <Typography variant="h6" style={{ color: '#38a169', fontWeight: '700' }}>
                    Pay on Delivery
                  </Typography>
                </Box>
                <Typography variant="body1" style={{ color: '#2d3748', marginBottom: '12px' }}>
                  You will pay the total amount of <strong>${getTotal().toFixed(2)}</strong> in cash when your order is delivered.
                </Typography>
                <Typography variant="body2" style={{ color: '#4a5568' }}>
                  • No upfront payment required<br/>
                  • Pay with cash upon delivery<br/>
                  • Keep exact change ready<br/>
                  • Delivery person will provide receipt
                </Typography>
              </Box>
            </Box>
          )}

          {/* Other Payment Methods */}
          {paymentMethod !== 'card' && paymentMethod !== 'cash' && (
            <Box mb={3}>
              <Typography variant="subtitle1" gutterBottom style={{ fontWeight: '600', marginBottom: '16px' }}>
                {paymentMethods.find(m => m.id === paymentMethod)?.name} Details
              </Typography>
              <Box
                style={{ 
                  borderRadius: '12px',
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  padding: '16px'
                }}
              >
                <Typography variant="body2" style={{ color: '#667eea' }}>
                  You will be redirected to complete your payment securely.
                </Typography>
              </Box>
            </Box>
          )}

          {/* Order Summary */}
          <Box 
            style={{ 
              backgroundColor: paymentMethod === 'cash' ? 'rgba(56, 161, 105, 0.1)' : 'rgba(102, 126, 234, 0.1)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '24px',
              border: paymentMethod === 'cash' ? '1px solid rgba(56, 161, 105, 0.2)' : '1px solid rgba(102, 126, 234, 0.2)'
            }}
          >
            <Typography variant="h6" gutterBottom style={{ fontWeight: '700', color: '#2d3748' }}>
              Order Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" style={{ color: '#4a5568' }}>
                  Subtotal:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" style={{ fontWeight: '600', color: '#2d3748' }}>
                  {cart.subtotal.formatted}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" style={{ color: '#4a5568' }}>
                  Shipping:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" style={{ fontWeight: '600', color: '#2d3748' }}>
                  ${shippingData?.shippingOption === 'express' ? '12.99' : shippingData?.shippingOption === 'overnight' ? '24.99' : '5.99'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" style={{ fontWeight: '700', color: '#2d3748' }}>
                  Total:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" style={{ fontWeight: '700', color: paymentMethod === 'cash' ? '#38a169' : '#667eea' }}>
                  ${getTotal().toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box 
                  style={{ 
                    marginTop: '12px',
                    padding: '12px',
                    backgroundColor: paymentMethod === 'cash' ? 'rgba(56, 161, 105, 0.2)' : 'rgba(102, 126, 234, 0.2)',
                    borderRadius: '8px',
                    border: `1px solid ${paymentMethod === 'cash' ? 'rgba(56, 161, 105, 0.3)' : 'rgba(102, 126, 234, 0.3)'}`
                  }}
                >
                  <Typography variant="body2" style={{ 
                    fontWeight: '600', 
                    color: paymentMethod === 'cash' ? '#38a169' : '#667eea',
                    textAlign: 'center'
                  }}>
                    Payment Method: {paymentMethod === 'cash' ? 'Cash on Delivery' : 'Credit/Debit Card'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Action Buttons */}
          <Box display="flex" justifyContent="space-between">
            <Button 
              onClick={backStep}
              variant="outlined"
              style={{
                borderRadius: '12px',
                padding: '12px 24px',
                fontWeight: '600',
                borderColor: '#667eea',
                color: '#667eea'
              }}
            >
              Back
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={isProcessing}
              style={{
                borderRadius: '12px',
                padding: '12px 32px',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
              }}
            >
              {isProcessing ? (
                <Box display="flex" alignItems="center">
                  <CircularProgress size={20} style={{ color: 'white', marginRight: '8px' }} />
                  Processing...
                </Box>
              ) : (
                paymentMethod === 'cash' ? `Place Order - Pay $${getTotal().toFixed(2)} on Delivery` : `Pay $${getTotal().toFixed(2)}`
              )}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default PaymentForm;
