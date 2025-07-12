import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardActionArea,
  Chip,
} from "@material-ui/core";
import { AddShoppingCart, LocalShipping } from "@material-ui/icons";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();
  
  const getStockStatus = () => {
    if (product.inventory > 20) return { label: "In Stock", color: "#27ae60" };
    if (product.inventory > 0) return { label: "Low Stock", color: "#f39c12" };
    return { label: "Out of Stock", color: "#e74c3c" };
  };

  const stockStatus = getStockStatus();

  return (
    <Card className={`${classes.root} fade-in`}>
      <Link to={`product-view/${product.id}`} style={{ textDecoration: "none" }}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.image.url}
            title={product.name}
          />
        </CardActionArea>
      </Link>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.cardContentName}>
          {product.name}
        </Typography>
        
        <Typography className={classes.cardContentDesc}>
          {product.description}
        </Typography>
        
        <Typography className={classes.cardContentPrice}>
          {product.price.formatted}
        </Typography>
        
        <Chip
          label={stockStatus.label}
          size="small"
          style={{
            backgroundColor: stockStatus.color,
            color: "white",
            fontWeight: "600",
            fontSize: "11px",
            minWidth: 70,
            paddingLeft: 6,
            paddingRight: 6,
          }}
        />
        <Typography variant="body2" className={classes.stockInfo}>
          Available: {product.inventory}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Button
          variant="contained"
          className={classes.button}
          endIcon={<AddShoppingCart />}
          onClick={() => onAddToCart(product.id, 1)}
          disabled={product.inventory === 0}
        >
          {product.inventory === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
