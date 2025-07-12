import React from "react";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import { useState, useEffect } from "react";
import "./style.css";

const createMarkup = (text) => {
  return { __html: text };
};

const ProductView = () => {
  const [product, setProduct] = useState({});

  const fetchProduct = async (id) => {
    // Find product from dummy data
    const dummyProducts = [
      {
        id: "prod_1",
        name: "The Great Gatsby",
        description: "A classic American novel by F. Scott Fitzgerald about the Jazz Age.",
        price: { formatted: "$12.99", raw: 12.99 },
        image: { url: "https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=The+Great+Gatsby" },
        category: { slug: "fiction" },
        inventory: 50,
        permalink: "the-great-gatsby"
      },
      {
        id: "prod_2",
        name: "To Kill a Mockingbird",
        description: "Harper Lee's masterpiece about racial injustice in the American South.",
        price: { formatted: "$14.99", raw: 14.99 },
        image: { url: "https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=To+Kill+a+Mockingbird" },
        category: { slug: "fiction" },
        inventory: 45,
        permalink: "to-kill-a-mockingbird"
      },
      {
        id: "prod_3",
        name: "1984",
        description: "George Orwell's dystopian novel about totalitarianism and surveillance.",
        price: { formatted: "$11.99", raw: 11.99 },
        image: { url: "https://via.placeholder.com/300x400/45B7D1/FFFFFF?text=1984" },
        category: { slug: "fiction" },
        inventory: 60,
        permalink: "1984"
      },
      {
        id: "prod_4",
        name: "Pride and Prejudice",
        description: "Jane Austen's beloved romance novel about love and social class.",
        price: { formatted: "$10.99", raw: 10.99 },
        image: { url: "https://via.placeholder.com/300x400/96CEB4/FFFFFF?text=Pride+and+Prejudice" },
        category: { slug: "fiction" },
        inventory: 40,
        permalink: "pride-and-prejudice"
      },
      {
        id: "prod_5",
        name: "Steve Jobs: The Exclusive Biography",
        description: "Walter Isaacson's comprehensive biography of Apple's visionary founder.",
        price: { formatted: "$19.99", raw: 19.99 },
        image: { url: "https://via.placeholder.com/300x400/FFEAA7/000000?text=Steve+Jobs+Bio" },
        category: { slug: "biography" },
        inventory: 30,
        permalink: "steve-jobs-biography"
      },
      {
        id: "prod_6",
        name: "Einstein: His Life and Universe",
        description: "Walter Isaacson's biography of the brilliant physicist Albert Einstein.",
        price: { formatted: "$16.99", raw: 16.99 },
        image: { url: "https://via.placeholder.com/300x400/DDA0DD/FFFFFF?text=Einstein+Bio" },
        category: { slug: "biography" },
        inventory: 25,
        permalink: "einstein-biography"
      },
      {
        id: "prod_7",
        name: "The Diary of Anne Frank",
        description: "The powerful diary of a young girl during the Holocaust.",
        price: { formatted: "$9.99", raw: 9.99 },
        image: { url: "https://via.placeholder.com/300x400/98D8C8/FFFFFF?text=Anne+Frank+Diary" },
        category: { slug: "biography" },
        inventory: 35,
        permalink: "anne-frank-diary"
      },
      {
        id: "prod_8",
        name: "Naruto Vol. 1",
        description: "The beginning of the epic ninja adventure by Masashi Kishimoto.",
        price: { formatted: "$7.99", raw: 7.99 },
        image: { url: "https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=Naruto+Vol+1" },
        category: { slug: "manga" },
        inventory: 100,
        permalink: "naruto-vol-1"
      },
      {
        id: "prod_9",
        name: "Dragon Ball Z Vol. 1",
        description: "Akira Toriyama's legendary martial arts manga series.",
        price: { formatted: "$8.99", raw: 8.99 },
        image: { url: "https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=Dragon+Ball+Z+Vol+1" },
        category: { slug: "manga" },
        inventory: 80,
        permalink: "dragon-ball-z-vol-1"
      },
      {
        id: "prod_10",
        name: "One Piece Vol. 1",
        description: "Eiichiro Oda's epic pirate adventure manga.",
        price: { formatted: "$7.99", raw: 7.99 },
        image: { url: "https://via.placeholder.com/300x400/45B7D1/FFFFFF?text=One+Piece+Vol+1" },
        category: { slug: "manga" },
        inventory: 90,
        permalink: "one-piece-vol-1"
      },
      {
        id: "prod_11",
        name: "Attack on Titan Vol. 1",
        description: "Hajime Isayama's dark fantasy manga about humanity's fight against giants.",
        price: { formatted: "$9.99", raw: 9.99 },
        image: { url: "https://via.placeholder.com/300x400/96CEB4/FFFFFF?text=Attack+on+Titan+Vol+1" },
        category: { slug: "manga" },
        inventory: 70,
        permalink: "attack-on-titan-vol-1"
      },
      {
        id: "prod_12",
        name: "The Hobbit",
        description: "J.R.R. Tolkien's beloved fantasy novel about Bilbo Baggins' adventure.",
        price: { formatted: "$13.99", raw: 13.99 },
        image: { url: "https://via.placeholder.com/300x400/FFEAA7/000000?text=The+Hobbit" },
        category: { slug: "featured" },
        inventory: 55,
        permalink: "the-hobbit"
      },
      {
        id: "prod_13",
        name: "Harry Potter and the Sorcerer's Stone",
        description: "J.K. Rowling's magical first book in the Harry Potter series.",
        price: { formatted: "$15.99", raw: 15.99 },
        image: { url: "https://via.placeholder.com/300x400/DDA0DD/FFFFFF?text=Harry+Potter+1" },
        category: { slug: "featured" },
        inventory: 65,
        permalink: "harry-potter-sorcerers-stone"
      },
      {
        id: "prod_14",
        name: "The Lord of the Rings",
        description: "Tolkien's epic fantasy trilogy in one volume.",
        price: { formatted: "$24.99", raw: 24.99 },
        image: { url: "https://via.placeholder.com/300x400/98D8C8/FFFFFF?text=Lord+of+the+Rings" },
        category: { slug: "featured" },
        inventory: 40,
        permalink: "lord-of-the-rings"
      },
      {
        id: "prod_15",
        name: "The Alchemist",
        description: "Paulo Coelho's inspirational novel about following your dreams.",
        price: { formatted: "$11.99", raw: 11.99 },
        image: { url: "https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=The+Alchemist" },
        category: { slug: "featured" },
        inventory: 55,
        permalink: "the-alchemist"
      }
    ];
    
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
