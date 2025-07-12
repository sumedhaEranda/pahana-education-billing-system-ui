import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { commerce } from "./lib/commerce";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import ProductView from "./components/ProductView/ProductView";
import Manga from "./components/Manga/Manga";
import Footer from "./components/Footer/Footer";
import Account from "./components/Account/Account";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import loadingImg from "./assets/loader.gif";
import "./style.css";
import Fiction from "./components/Fiction/Fiction";
import Biography from "./components/Bio/Biography";
import apiService from "./lib/apiService";

// Dummy cart data
const dummyCart = {
  id: "cart_123",
  total_items: 0,
  total_unique_items: 0,
  subtotal: { formatted: "$0.00", raw: 0 },
  line_items: [],
  currency: { code: "USD", symbol: "$" }
};

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [mangaProducts, setMangaProducts] = useState([]);
  const [fictionProducts, setFictionProducts] = useState([]);
  const [bioProducts, setBioProducts] = useState([]);
  const [featureProducts, setFeatureProducts] = useState([]);
  const [cart, setCart] = useState(dummyCart);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (error) {
      setProducts([]);
    }
  };

  const fetchMangaProducts = async (allProducts) => {
    const mangaData = allProducts.filter(product => product.category?.slug === "manga");
    setMangaProducts(mangaData);
  };

  const fetchFeatureProducts = async (allProducts) => {
    const featureData = allProducts.filter(product => product.category?.slug === "featured");
    setFeatureProducts(featureData);
  };

  const fetchFictionProducts = async (allProducts) => {
    const fictionData = allProducts.filter(product => product.category?.slug === "fiction");
    setFictionProducts(fictionData);
  };

  const fetchBioProducts = async (allProducts) => {
    const bioData = allProducts.filter(product => product.category?.slug === "biography");
    setBioProducts(bioData);
  };

  const fetchCart = async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    setCart(dummyCart);
  };

  const handleAddToCart = async (productId, quantity) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (product.inventory < quantity) return; // Prevent adding more than available

    const existingItem = cart.line_items.find(item => item.product_id === productId);
    let newLineItems = [...cart.line_items];
    if (existingItem) {
      newLineItems = newLineItems.map(item =>
        item.product_id === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newLineItems.push({
        id: `line_${Date.now()}`,
        product_id: productId,
        name: product.name,
        quantity: quantity,
        line_total: { formatted: `$${(product.price.raw * quantity).toFixed(2)}`, raw: product.price.raw * quantity },
        image: product.image,
        price: product.price
      });
    }
    const totalItems = newLineItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = newLineItems.reduce((sum, item) => sum + item.line_total.raw, 0);
    setCart({
      ...cart,
      line_items: newLineItems,
      total_items: totalItems,
      total_unique_items: newLineItems.length,
      subtotal: { formatted: `$${subtotal.toFixed(2)}`, raw: subtotal }
    });

    // Reduce inventory in products state
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId
          ? { ...p, inventory: p.inventory - quantity }
          : p
      )
    );
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(lineItemId);
      return;
    }

    const newLineItems = cart.line_items.map(item => 
      item.id === lineItemId 
        ? { 
            ...item, 
            quantity: quantity,
            line_total: { 
              formatted: `$${(item.price.raw * quantity).toFixed(2)}`, 
              raw: item.price.raw * quantity 
            }
          }
        : item
    );

    const totalItems = newLineItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = newLineItems.reduce((sum, item) => sum + item.line_total.raw, 0);

    setCart({
      ...cart,
      line_items: newLineItems,
      total_items: totalItems,
      total_unique_items: newLineItems.length,
      subtotal: { formatted: `$${subtotal.toFixed(2)}`, raw: subtotal }
    });
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const newLineItems = cart.line_items.filter(item => item.id !== lineItemId);
    
    const totalItems = newLineItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = newLineItems.reduce((sum, item) => sum + item.line_total.raw, 0);

    setCart({
      ...cart,
      line_items: newLineItems,
      total_items: totalItems,
      total_unique_items: newLineItems.length,
      subtotal: { formatted: `$${subtotal.toFixed(2)}`, raw: subtotal }
    });
  };

  const handleEmptyCart = async () => {
    setCart(dummyCart);
  };

  const refreshCart = async () => {
    setCart(dummyCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      // Calculate shipping cost
      const shippingOptions = {
        'standard': 5.99,
        'express': 12.99,
        'overnight': 24.99
      };
      
      const shippingCost = shippingOptions[newOrder.fulfillment?.shipping_method] || 0;
      const totalWithShipping = cart.subtotal.raw + shippingCost;

      // Simulate successful checkout
      const incomingOrder = {
        id: `order_${Date.now()}`,
        customer: newOrder.customer,
        line_items: cart.line_items,
        shipping: newOrder.shipping,
        payment: newOrder.payment,
        subtotal: cart.subtotal,
        shipping_cost: { formatted: `$${shippingCost.toFixed(2)}`, raw: shippingCost },
        total: { formatted: `$${totalWithShipping.toFixed(2)}`, raw: totalWithShipping },
        status: "fulfilled",
        created_at: new Date().toISOString()
      };

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage("Checkout failed. Please try again.");
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await apiService.getProducts();
        setProducts(data);
        fetchFeatureProducts(data);
        fetchMangaProducts(data);
        fetchFictionProducts(data);
        fetchBioProducts(data);
      } catch (error) {
        setProducts([]);
        setFeatureProducts([]);
        setMangaProducts([]);
        setFictionProducts([]);
        setBioProducts([]);
      }
    };
    loadProducts();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <div>
      {products.length > 0 ? (
        <>
          <Router>
            <div style={{ display: "flex" }}>
              <CssBaseline />
              <Navbar
                totalItems={cart.total_items}
                handleDrawerToggle={handleDrawerToggle}
              />
              <Switch>
                <Route exact path="/">
                  <Products
                    products={products}
                    featureProducts={featureProducts}
                    onAddToCart={handleAddToCart}
                    handleUpdateCartQty
                  />
                </Route>
                <Route exact path="/cart">
                  <Cart
                    cart={cart}
                    onUpdateCartQty={handleUpdateCartQty}
                    onRemoveFromCart={handleRemoveFromCart}
                    onEmptyCart={handleEmptyCart}
                  />
                </Route>
                <Route path="/checkout" exact>
                  <Checkout
                    cart={cart}
                    order={order}
                    onCaptureCheckout={handleCaptureCheckout}
                    error={errorMessage}
                  />
                </Route>
                <Route path="/product-view/:id" exact>
                  <ProductView />
                </Route>
                <Route path="/manga" exact>
                  <Manga
                    mangaProducts={mangaProducts}
                    onAddToCart={handleAddToCart}
                    handleUpdateCartQty
                  />
                </Route>
                <Route path="/fiction" exact>
                  <Fiction
                    fictionProducts={fictionProducts}
                    onAddToCart={handleAddToCart}
                    handleUpdateCartQty
                  />
                </Route>
                <Route path="/biography" exact>
                  <Biography
                    bioProducts={bioProducts}
                    onAddToCart={handleAddToCart}
                    handleUpdateCartQty
                  />
                </Route>
                <Route path="/account" exact>
                  <Account />
                </Route>
              </Switch>
            </div>
          </Router>
          <Footer />
        </>
      ) : (
        <div className="loader">
          <img src={loadingImg} alt="Loading" />
        </div>
      )}
    </div>
  );
};

export default App;
