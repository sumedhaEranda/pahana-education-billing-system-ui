import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const Review = ({ cart, shippingData }) => {
  // Calculate shipping cost based on selected option
  const getShippingCost = () => {
    if (!shippingData?.shippingOption) return 0;
    
    const shippingOptions = {
      'standard': 5.99,
      'express': 12.99,
      'overnight': 24.99
    };
    
    return shippingOptions[shippingData.shippingOption] || 0;
  };

  const shippingCost = getShippingCost();
  const subtotal = cart.subtotal.raw;
  const total = subtotal + shippingCost;

  return (
    <>
      <Typography variant="h6" gutterBottom>Order summary</Typography>
      <List disablePadding>
        {cart.line_items.map((product) => (
          <ListItem style={{ padding: '10px 0' }} key={product.name}>
            <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
            <Typography variant="body2">{product.line_total.formatted}</Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: '10px 0' }}>
          <ListItemText primary="Subtotal" />
          <Typography variant="body2">{cart.subtotal.formatted}</Typography>
        </ListItem>
        <ListItem style={{ padding: '10px 0' }}>
          <ListItemText primary="Shipping" />
          <Typography variant="body2">${shippingCost.toFixed(2)}</Typography>
        </ListItem>
        <ListItem style={{ padding: '10px 0' }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            ${total.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
