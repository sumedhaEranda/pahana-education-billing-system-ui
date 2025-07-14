import React from 'react';
import { Typography, Button, Box, Paper, Snackbar, Checkbox } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import useStyles from './styles';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart, checked, onCheck }) => {
  const classes = useStyles();
  const [showError, setShowError] = React.useState(false);

  const handleUpdateCartQty = (lineItemId, newQuantity) => {
    if (newQuantity > item.quantity && item.inventory && item.quantity >= item.inventory.available) {
      setShowError(true);
      return;
    }
    onUpdateCartQty(lineItemId, newQuantity, item.name);
  };

  const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);
  const handleCloseError = () => setShowError(false);

  return (
    <Paper elevation={1} style={{ display: 'flex', alignItems: 'center', padding: 16, minHeight: 100 }}>
      {/* Checkbox left */}
      <Box style={{ minWidth: 40, marginRight: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Checkbox
          checked={!!checked}
          onChange={() => onCheck(item.id)}
          color="primary"
        />
      </Box>
      {/* Image left */}
      <Box style={{ minWidth: 80, maxWidth: 100, marginRight: 24, display: 'flex', alignItems: 'center' }}>
        <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: 8 }} />
      </Box>
      {/* Center: name, quantity controls */}
      <Box style={{ flex: 1, textAlign: 'center' }}>
        <Typography variant="h6">{item.name}</Typography>
        <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
          <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
            disabled={item.inventory && item.quantity >= item.inventory.available}
          >+
          </Button>
        </Box>
      </Box>
      {/* Price and remove button right */}
      <Box style={{ minWidth: 120, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
        <Typography variant="h6" color='secondary'>{item.line_total.formatted}</Typography>
        <Button
          className={classes.button}
          variant="contained"
          type="button"
          color='secondary'
          onClick={() => handleRemoveFromCart(item.id)}
          size="small"
        >Remove</Button>
      </Box>
      <Snackbar open={showError} autoHideDuration={3000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          Cannot add more items. Maximum stock limit reached.
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CartItem;
