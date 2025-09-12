import React from "react";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";

const createMarkup = (text) => {
  return { __html: text };
};

const ProductView = () => {
  const [product, setProduct] = useState({});

  const fetchProduct = async (id) => {
    const dummyProducts = await apiService.getProducts();
      
    
    const foundProduct = dummyProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct({
        name: foundProduct.name,
        quantity: foundProduct.inventory,
        description: foundProduct.description,
        src: foundProduct.image.url,
        price: foundProduct.price.formatted,
      });
    }
  };

  useEffect(() => {
    const id = window.location.pathname.split("/");
    fetchProduct(id[2]);
  }, []);

  return (
    <Container className="product-view main-content">
      <Grid container className="fade-in">
        <Grid item xs={12} md={6} className="image-wrapper">
          <img src={product.src} alt={product.name} />
        </Grid>
        <Grid item xs={12} md={5} className="text">
          <Typography variant="h2">
            <b>{product.name}</b>
          </Typography>
          <Typography
            variant="p"
            dangerouslySetInnerHTML={createMarkup(product.description)}
          />
          <Typography variant="h3" color="secondary">
            Price: <b> {product.price} </b>
          </Typography>
          <br />
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Button
                size="large"
                className="custom-button"
                component={Link}
                to="/"
              >
                Continue Shopping
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductView;
