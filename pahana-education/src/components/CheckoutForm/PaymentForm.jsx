import React, { useState } from "react";
import { Typography, Button, Grid, TextField } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";

import Review from "./Review";

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

  // Dummy payment methods
  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🔵' },
    { id: 'applepay', name: 'Apple Pay', icon: '🍎' }
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

  // Dummy card validation - more flexible for testing
  const validateCard = () => {
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
    
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateCard()) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderData = {
        line_items: cart.line_items,
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
          method: paymentMethod,
          card_last4: cardNumber.slice(-4),
        },
      };

      onCaptureCheckout(cart.id, orderData);
      setIsProcessing(false);
      nextStep();
    }, 2000);
  };

  return (
    <>
      <Review cart={cart} shippingData={shippingData} />
      <div style={{ 
        height: "1px", 
        backgroundColor: "#e0e0e0", 
        margin: "24px 0",
        width: "100%" 
      }} />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          {/* Payment Method Selection */}
          <div style={{ marginBottom: "20px" }}>
            <Typography variant="subtitle1" gutterBottom>Select Payment Method</Typography>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {paymentMethods.map((method) => (
                <Button
                  key={method.id}
                  variant={paymentMethod === method.id ? "contained" : "outlined"}
                  onClick={() => setPaymentMethod(method.id)}
                  style={{ 
                    minWidth: "120px",
                    backgroundColor: paymentMethod === method.id ? "#001524" : "transparent",
                    color: paymentMethod === method.id ? "white" : "inherit"
                  }}
                >
                  <span style={{ marginRight: "5px" }}>{method.icon}</span>
                  {method.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Card Details Form */}
          {paymentMethod === 'card' && (
            <div style={{ marginBottom: "20px" }}>
              <Typography variant="subtitle1" gutterBottom>Card Details</Typography>
              <Typography variant="body2" color="textSecondary" style={{ marginBottom: "15px" }}>
                For testing, you can use any valid-looking card details. Examples: 4111111111111111 (Visa), 5555555555554444 (Mastercard), 378282246310005 (Amex)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Cardholder Name"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    variant="outlined"
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
                    helperText="Enter as MMYY (e.g., 1225 for December 2025)"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    label="CVV"
                    value={cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setCvv(value);
                    }}
                    placeholder="123 or 1234"
                    variant="outlined"
                    helperText="3 digits for most cards, 4 digits for Amex"
                  />
                </Grid>
              </Grid>
            </div>
          )}

        {/* Other Payment Methods */}
        {paymentMethod === 'paypal' && (
          <div style={{ marginBottom: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <Typography variant="subtitle1" gutterBottom>PayPal</Typography>
            <Typography variant="body2" color="textSecondary">
              You will be redirected to PayPal to complete your payment securely.
            </Typography>
          </div>
        )}

        {paymentMethod === 'applepay' && (
          <div style={{ marginBottom: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <Typography variant="subtitle1" gutterBottom>Apple Pay</Typography>
            <Typography variant="body2" color="textSecondary">
              Complete your purchase using Apple Pay on your device.
            </Typography>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={backStep}>
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isProcessing}
            style={{ backgroundColor: "#001524", color: "#FFFF" }}
          >
            {isProcessing ? "Processing..." : `Pay $${getTotal().toFixed(2)}`}
          </Button>
        </div>
        </form>
      </FormProvider>
    </>
  );
};

export default PaymentForm;
