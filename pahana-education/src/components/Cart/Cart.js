import React from 'react';
import { Container, Typography, Button, Grid, Box, TextField, Paper, Checkbox, FormControlLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ShoppingCart } from '@material-ui/icons';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const classes = useStyles();
  const [coupon, setCoupon] = React.useState("");
  const [selectedItems, setSelectedItems] = React.useState([]);

  React.useEffect(() => {
    // If cart changes (e.g. item removed), remove deselected items
    if (cart.line_items) {
      setSelectedItems((prev) => prev.filter(id => cart.line_items.some(item => item.id === id)));
    }
  }, [cart.line_items]);

  const handleEmptyCart = () => {
    onEmptyCart();
    setSelectedItems([]);
  };

  const handleCheckItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (!cart.line_items) return;
    if (selectedItems.length === cart.line_items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.line_items.map(item => item.id));
    }
  };

  if (!cart.line_items) return (
    <Container>
      <div className={classes.toolbar} />
      <div className={classes.cartContainer}>
        <Typography variant="h6" align="center">Loading...</Typography>
      </div>
    </Container>
  );

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

  // Calculate subtotal/total for selected items
  const selectedLineItems = cart.line_items.filter(item => selectedItems.includes(item.id));
  const selectedSubtotal = selectedLineItems.reduce((sum, item) => sum + item.line_total.raw, 0);

  const renderCart = () => (
    <Grid container spacing={4}>
      {/* Cart Items List */}
      <Grid item xs={12} md={8}>
        {cart.line_items.length === 0 ? (
          renderEmptyCart()
        ) : (
          <Paper elevation={0} style={{ background: 'none', boxShadow: 'none' }}>
            <Box mb={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedItems.length === cart.line_items.length && cart.line_items.length > 0}
                    indeterminate={selectedItems.length > 0 && selectedItems.length < cart.line_items.length}
                    onChange={handleSelectAll}
                    color="primary"
                  />
                }
                label="Select All"
              />
            </Box>
            {cart.line_items.map((lineItem) => (
              <Box mb={2} key={lineItem.id}>
                <CartItem
                  item={lineItem}
                  onUpdateCartQty={onUpdateCartQty}
                  onRemoveFromCart={onRemoveFromCart}
                  checked={selectedItems.includes(lineItem.id)}
                  onCheck={handleCheckItem}
                />
              </Box>
            ))}
          </Paper>
        )}
      </Grid>
      {/* Cart Summary */}
      <Grid item xs={12} md={4}>
        <Box className={classes.totalSection} style={{ position: 'sticky', top: 32 }}>
          <Typography variant="h6" style={{ marginBottom: 8 }}>Subtotal</Typography>
          <Typography variant="h5" className={classes.totalText} style={{ marginBottom: 16 }}>
            ${selectedSubtotal.toFixed(2)}
          </Typography>
          <Typography variant="h6" style={{ marginBottom: 8 }}>Total</Typography>
          <Typography variant="h5" className={classes.totalText} style={{ marginBottom: 24 }}>
            ${selectedSubtotal.toFixed(2)}
          </Typography>
          <TextField
            label="Have a coupon?"
            variant="outlined"
            size="small"
            fullWidth
            value={coupon}
            onChange={e => setCoupon(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <Button 
            className={classes.checkoutButton} 
            component={Link} 
            to="/checkout" 
            size="large" 
            type="button" 
            variant="contained"
            fullWidth
            style={{ marginBottom: 12 }}
            disabled={selectedItems.length === 0}
          >
            PROCEED TO CHECKOUT
          </Button>
          <Button 
            className={classes.emptyButton} 
            size="large" 
            type="button" 
            variant="outlined" 
            onClick={handleEmptyCart}
            fullWidth
          >
            Empty Cart
          </Button>
        </Box>
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="lg" className="main-content">
      <div className={classes.toolbar} />
      <Typography className={`${classes.title} gradient-text`} variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      <div className={`${classes.cartContainer} fade-in`}>
        {renderCart()}
      </div>
    </Container>
  );
};

export default Cart;
