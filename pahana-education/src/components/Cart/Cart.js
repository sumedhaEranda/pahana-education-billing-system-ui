import React from 'react';
import { Container, Typography, Button, Grid, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ShoppingCart } from '@material-ui/icons';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const classes = useStyles();

  const handleEmptyCart = () => onEmptyCart();

  const renderEmptyCart = () => (
    <div className={classes.emptyCart}>
      <ShoppingCart className={classes.emptyCartIcon} />
      <Typography variant="h5" gutterBottom>
        Your cart is empty
      </Typography>
      <Typography variant="body1" gutterBottom>
        Looks like you haven't added any items to your cart yet.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        className={classes.checkoutButton}
        style={{ marginTop: "20px" }}
      >
        Start Shopping
      </Button>
    </div>
  );

  if (!cart.line_items) return (
    <Container>
      <div className={classes.toolbar} />
      <div className={classes.cartContainer}>
        <Typography variant="h6" align="center">Loading...</Typography>
      </div>
    </Container>
  );

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((lineItem) => (
          <Grid item xs={12} sm={6} md={4} key={lineItem.id}>
            <CartItem item={lineItem} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart} />
          </Grid>
        ))}
      </Grid>
      
      <div className={classes.totalSection}>
        <Typography variant="h5" className={classes.totalText}>
          Subtotal: {cart.subtotal.formatted}
        </Typography>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
          {cart.total_items} item{cart.total_items !== 1 ? 's' : ''} in cart
        </Typography>
      </div>
      
      <div className={classes.cardDetails}>
        <Button 
          className={classes.emptyButton} 
          size="large" 
          type="button" 
          variant="outlined" 
          onClick={handleEmptyCart}
        >
          Empty Cart
        </Button>
        <Button 
          className={classes.checkoutButton} 
          component={Link} 
          to="/checkout" 
          size="large" 
          type="button" 
          variant="contained"
        >
          Proceed to Checkout
        </Button>
      </div>
    </>
  );

  return (
    <Container maxWidth="lg" className="main-content">
      <div className={classes.toolbar} />
      <Typography className={`${classes.title} gradient-text`} variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      
      <div className={`${classes.cartContainer} fade-in`}>
        {!cart.line_items.length ? renderEmptyCart() : renderCart()}
      </div>
    </Container>
  );
};

export default Cart;
