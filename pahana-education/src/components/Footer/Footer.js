import React from "react";
import { Container, Grid, Typography, Box, IconButton } from "@material-ui/core";
import { GitHub, LinkedIn, Instagram, Email } from "@material-ui/icons";
import logo from "../../assets/circles.png";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #001524 0%, #1a1a2e 100%)",
        color: "white",
        py: 6,
        mt: 8,
        position: "relative",
        overflow: "hidden",
      }}
      className="fade-in"
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />
      
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <img src={logo} alt="Pahana Book Shop" height="50px" style={{ marginRight: "12px" }} />
              <Typography variant="h5" className="gradient-text" style={{ fontWeight: 700 }}>
                Pahana Book Shop
              </Typography>
            </Box>
            <Typography variant="body2" style={{ lineHeight: 1.8, opacity: 0.9 }}>
              Your premier destination for discovering and purchasing books online. 
              Explore our curated collection of fiction, biography, manga, and more. 
              Start your literary journey with us today.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 700, marginBottom: "20px" }}>
              Categories
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography 
                component="a" 
                href="/manga" 
                style={{ 
                  color: "white", 
                  textDecoration: "none", 
                  opacity: 0.8,
                  transition: "all 0.3s ease",
                  "&:hover": { opacity: 1, transform: "translateX(4px)" }
                }}
              >
                Manga
              </Typography>
              <Typography 
                component="a" 
                href="/biography" 
                style={{ 
                  color: "white", 
                  textDecoration: "none", 
                  opacity: 0.8,
                  transition: "all 0.3s ease"
                }}
              >
                Biography
              </Typography>
              <Typography 
                component="a" 
                href="/fiction" 
                style={{ 
                  color: "white", 
                  textDecoration: "none", 
                  opacity: 0.8,
                  transition: "all 0.3s ease"
                }}
              >
                Fiction
              </Typography>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 700, marginBottom: "20px" }}>
              Contact Us
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" alignItems="center">
                <Email style={{ marginRight: "8px", opacity: 0.8 }} />
                <Typography variant="body2" style={{ opacity: 0.8 }}>
                  chapachandi23@gmail.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Social Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 700, marginBottom: "20px" }}>
              Follow Us
            </Typography>
            <Box display="flex" gap={2}>
              <IconButton
                href="https://github.com"
                target="_blank"
                style={{
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" }
                }}
                className="hover-lift"
              >
                <GitHub />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                style={{
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" }
                }}
                className="hover-lift"
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                style={{
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" }
                }}
                className="hover-lift"
              >
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          mt={4}
          pt={3}
          borderTop="1px solid rgba(255, 255, 255, 0.1)"
          textAlign="center"
        >
          <Typography variant="body2" style={{ opacity: 0.7 }}>
            &copy; {new Date().getFullYear()} BOOKSHOP. All rights reserved. 
            Made with ❤️ for book lovers.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
