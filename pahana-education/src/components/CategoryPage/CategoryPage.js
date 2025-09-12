import React, { useState, useEffect } from "react";
import { Grid, Typography, CircularProgress, Box } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Product from "../Products/Product/Product.js";
import useStyles from "../Products/styles.js";
import apiService from "../../lib/apiService";
import "../ProductView/style.css";

const CategoryPage = ({ onAddToCart }) => {
  const classes = useStyles();
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("🔍 Fetching products for category:", categoryName);
        const categoryProducts = await apiService.getProductsByCategory(categoryName);
        
        console.log("📦 Category products received:", categoryProducts);
        setProducts(categoryProducts);
      } catch (error) {
        console.error("❌ Error fetching category products:", error);
        setError("Failed to load products for this category");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchCategoryProducts();
    }
  }, [categoryName]);

  const handleAddToCart = async (productId, quantity) => {
    console.log("🛒 CategoryPage: Adding to cart", { productId, quantity });
    
    // Get cart data for the API call
    const cartData = {
      itemId: parseInt(productId.replace('prod_', '')) || 1,
      itemName: products.find(p => p.id === productId)?.name || '',
      quantity: quantity,
      pricePerUnit: products.find(p => p.id === productId)?.price?.raw || 0,
      itemUrl: products.find(p => p.id === productId)?.image?.url || '',
      description: (products.find(p => p.id === productId)?.description || '').substring(0, 255)
    };

    // Call the parent's onAddToCart with cart data
    await onAddToCart(productId, quantity, null, cartData);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
        <Typography variant="h6" style={{ marginLeft: 16 }}>
          Loading {categoryName} products...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <main className={`${classes.mainPage} main-content`}>
        <div className={classes.toolbar} />

        <div className={`${classes.categorySection} fade-in`}>
          <Typography variant="h3" className={classes.categoryHeader}>
            {categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'Category'}
          </Typography>
          <Typography variant="h5" className={classes.categoryDesc}>
            Browse our collection of {categoryName} books
          </Typography>
          
          {products.length === 0 ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
              <Typography variant="h6" color="textSecondary">
                No products found in this category.
              </Typography>
            </Box>
          ) : (
            <Grid
              className={classes.categoryFeatured}
              container
              justifyContent="center"
              spacing={1}
            >
              {products.map((product) => (
                <Grid
                  key={product.id}
                  className={classes.categoryFeatured}
                  item
                  xs={6}
                  sm={5}
                  md={3}
                  lg={2}
                  id="pro"
                >
                  <Product 
                    product={product} 
                    onAddToCart={handleAddToCart} 
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </main>
    </>
  );
};

export default CategoryPage;
