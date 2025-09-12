import React, { useState, useRef, useEffect } from "react";
import { Grid, InputAdornment, Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Product from "./Product/Product.js";
import useStyles from "./styles";
import logo1 from "../../assets/Bookshop.gif";
import scrollImg from "../../assets/scroll.gif";
import "../ProductView/style.css";
import { Link } from "react-router-dom";
import mangaBg from "../../assets/maxresdefault.jpg";
import bioBg from "../../assets/biography.jpg";
import fictionBg from "../../assets/fiction.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import apiService from "../../lib/apiService";

const Products = ({ products, onAddToCart, featureProducts }) => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);

  const handleInputClick = () => {
    // Scrolls to the section when the input is clicked
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Helper function to get background image for category
  const getCategoryBackground = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes('manga')) return mangaBg;
    if (name.includes('biography') || name.includes('bio')) return bioBg;
    if (name.includes('fiction')) return fictionBg;
    if (name.includes('adventure')) return mangaBg;
    if (name.includes('children')) return bioBg;
    if (name.includes('classic')) return fictionBg;
    if (name.includes('dystopian')) return mangaBg;
    if (name.includes('fantasy')) return bioBg;
    if (name.includes('historical')) return fictionBg;
    if (name.includes('mystery')) return mangaBg;
    if (name.includes('poetry')) return bioBg;
    if (name.includes('romance')) return fictionBg;
    if (name.includes('spiritual')) return mangaBg;
    if (name.includes('thriller')) return bioBg;
    if (name.includes('young adult')) return fictionBg;
    return mangaBg; // default fallback
  };

  // Fetch categories from API using apiService
  const fetchCategories = async () => {
    try {
      setLoading(true);
      console.log("🔄 Loading categories from API...");
      
      const data = await apiService.getCategories();
      setCategories(data);
      console.log("📂 Categories loaded successfully:", data);
    } catch (error) {
      console.error("❌ Failed to load categories:", error);
      // Set empty array on error to show fallback
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };



  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <main className={`${classes.mainPage} main-content`}>
      <div className={classes.toolbar} />
      <img src={scrollImg} className={classes.scrollImg} />
      <div className={`${classes.hero} fade-in`}>
        <img className={classes.heroImg} src={logo1} height="720px" />

        <div className={classes.heroCont}>
          <h1 className={classes.heroHeader}>
            Discover Your Next Favorite Book Here.
          </h1>
          <h3 className={classes.heroDesc} ref={sectionRef}>
            Explore our curated collection of new and popular books to find your
            next literary adventure.
          </h3>
          <div className={classes.searchs}>
            <Input
              className={classes.searchb}
              type="text"
              placeholder="Which book are you looking for?"
              onClick={handleInputClick}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </div>
        </div>
      </div>

      {searchTerm === "" && (
        <div className={classes.categorySection}>
          <h1 className={classes.categoryHeader}>Categories</h1>
          <h3 className={classes.categoryDesc}>
            Discover amazing books across different genres and categories
          </h3>
          <div 
            className={classes.buttonSection}
            style={{
              overflowX: 'auto',
              overflowY: 'hidden',
              whiteSpace: 'nowrap',
              padding: '10px 0',
              scrollbarWidth: 'thin',
              scrollbarColor: '#f1361d #f0f0f0'
            }}
          >
            {loading ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '4px solid #f0f0f0',
                  borderTop: '4px solid #f1361d',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <div style={{
                  color: '#455A64',
                  fontSize: '16px',
                  fontFamily: 'Raleway',
                  fontWeight: '500'
                }}>Loading amazing categories...</div>
              </div>
            ) : categories.length > 0 ? (
              categories.map((category, index) => (
                <div 
                  key={category.id || index}
                  style={{
                    display: 'inline-block',
                    marginRight: '28px',
                    verticalAlign: 'top',
                    minWidth: '280px',
                    textAlign: 'center',
                    animation: 'fadeInUp 0.6s ease forwards',
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  <Link to={`/category/${category?.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                    <button
                      className={classes.categoryButton}
                      style={{ 
                        backgroundImage: `url(${getCategoryBackground(category || '')})` 
                      }}
                    >
                      <div className={classes.exploreOverlay}>
                        Explore
                      </div>
                    </button>
                  </Link>
                  <div className={classes.categoryName}>
                    {category}
                  </div>
                </div>
              ))
            ) : (
              // Fallback to hardcoded categories if API data is not available
              <>
                <div style={{
                  display: 'inline-block',
                  marginRight: '28px',
                  verticalAlign: 'top',
                  minWidth: '280px',
                  textAlign: 'center'
                }}>
                  <Link to="manga" style={{ textDecoration: 'none' }}>
                    <button
                      className={classes.categoryButton}
                      style={{ 
                        backgroundImage: `url(${mangaBg})`
                      }}
                    >
                      <div className={classes.exploreOverlay}>
                        Explore
                      </div>
                    </button>
                  </Link>
                  <div className={classes.categoryName}>Manga</div>
                </div>
                <div style={{
                  display: 'inline-block',
                  marginRight: '28px',
                  verticalAlign: 'top',
                  minWidth: '280px',
                  textAlign: 'center'
                }}>
                  <Link to="biography" style={{ textDecoration: 'none' }}>
                    <button
                      className={classes.categoryButton}
                      style={{ 
                        backgroundImage: `url(${bioBg})`
                      }}
                    >
                      <div className={classes.exploreOverlay}>
                        Explore
                      </div>
                    </button>
                  </Link>
                  <div className={classes.categoryName}>Biography</div>
                </div>
                <div style={{
                  display: 'inline-block',
                  marginRight: '28px',
                  verticalAlign: 'top',
                  minWidth: '280px',
                  textAlign: 'center'
                }}>
                  <Link to="fiction" style={{ textDecoration: 'none' }}>
                    <button
                      className={classes.categoryButton}
                      style={{ 
                        backgroundImage: `url(${fictionBg})`
                      }}
                    >
                      <div className={classes.exploreOverlay}>
                        Explore
                      </div>
                    </button>
                  </Link>
                  <div className={classes.categoryName}>Fiction</div>
                </div>
              </>
            )}
          </div>
        </div>
      )}


      <div className={classes.carouselSection}>
        <Carousel
          showIndicators={false}
          autoPlay={true}
          infiniteLoop={true}
          showArrows={true}
          showStatus={false}
          showThumbs={false}
        >
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div>Loading categories...</div>
            </div>
          ) : categories.length > 0 ? (
            categories.map((category, index) => (
              <div key={category.id || index} style={{ textAlign: 'center' }}>
                <Link to={`/category/${category?.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                  <button
                    className={classes.categoryButton}
                    style={{ 
                      backgroundImage: `url(${getCategoryBackground(category || '')})` 
                    }}
                  >
                    <div className={classes.exploreOverlay}>
                      Explore
                    </div>
                  </button>
                </Link>
                <div className={classes.categoryName}>
                  {category}
                </div>
              </div>
            ))
          ) : (
            // Fallback to hardcoded categories if API data is not available
            <>
              <div style={{ textAlign: 'center' }}>
                <Link to="manga" style={{ textDecoration: 'none' }}>
                  <button
                    className={classes.categoryButton}
                    style={{ backgroundImage: `url(${mangaBg})` }}
                  >
                    <div className={classes.exploreOverlay}>
                      Explore
                    </div>
                  </button>
                </Link>
                <div className={classes.categoryName}>Manga</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Link to="biography" style={{ textDecoration: 'none' }}>
                  <button
                    className={classes.categoryButton}
                    style={{ backgroundImage: `url(${bioBg})` }}
                  >
                    <div className={classes.exploreOverlay}>
                      Explore
                    </div>
                  </button>
                </Link>
                <div className={classes.categoryName}>Biography</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Link to="fiction" style={{ textDecoration: 'none' }}>
                  <button
                    className={classes.categoryButton}
                    style={{ backgroundImage: `url(${fictionBg})` }}
                  >
                    <div className={classes.exploreOverlay}>
                      Explore
                    </div>
                  </button>
                </Link>
                <div className={classes.categoryName}>Fiction</div>
              </div>
            </>
          )}
        </Carousel>
      </div>

      {searchTerm === "" && (
        <>
          <div>
            <h3 className={classes.contentHeader}>
              Best <span style={{ color: "#f1361d" }}>Sellers</span>
            </h3>
            <Grid
              className={classes.contentFeatured}
              container
              justifyContent="center"
              spacing={1}
            >
              {featureProducts.map((product) => (
                <Grid
                  className={classes.contentFeatured}
                  item
                  xs={6}
                  sm={5}
                  md={3}
                  lg={2}
                  id="pro"
                  key={product.id}
                >
                  <Product product={product} onAddToCart={onAddToCart} />
                </Grid>
              ))}
            </Grid>
          </div>
        </>
      )}

      <div>
        {searchTerm === "" && (
          <>
            <h1 className={classes.booksHeader}>
              Discover <span style={{ color: "#f1361d" }}>Books</span>
            </h1>
            <h3 className={classes.booksDesc}>
              Explore our comprehensive collection of books.
            </h3>
          </>
        )}
        <div className={classes.mobileSearch}>
          <div className={classes.mobSearchs}>
            <Input
              className={classes.mobSearchb}
              type="text"
              placeholder="Search for books"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </div>
        </div>
        <Grid
          className={classes.content}
          container
          justifyContent="center"
          spacing={2}
        >
          {products
            .filter((product) => {
              if (searchTerm === "") {
                return product;
              } else if (
                product.name
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              ) {
                return product;
              }
            })
            .map((product) => (
              <Grid
                className={classes.content}
                item
                xs={6}
                sm={6}
                md={4}
                lg={3}
                id="pro"
                key={product.id}
              >
                <Product product={product} onAddToCart={onAddToCart} />
              </Grid>
            ))}
        </Grid>
      </div>
    </main>
  );
};

export default Products;
