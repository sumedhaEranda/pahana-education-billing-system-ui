import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  mainPage: { 
    flexGrow: 1, 
    overflowX: "hidden", 
    background: "transparent"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(20),
    paddingTop: theme.spacing(2),
  },
  hero: {
    flexDirection: "column",
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(20),
    backgroundColor: "white",
  },
  heroHeader: {
    textAlign: "center",
    color: "#001524",
    fontSize: 68,
    fontFamily: "Poppins",
    fontWeight: "800",
    letterSpacing: -3,
    lineHeight: 0.9,
    wordSpacing: 8,
    width: 660,
    paddingBottom: 8,
  },
  heroDesc: {
    textAlign: "center",
    color: "#455A64",
    fontSize: 24,
    fontFamily: "Raleway",
    paddingBottom: 28,
    width: 584,
  },

  contentHeader: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 40,
    fontFamily: "Poppins",
    fontWeight: "bolder",
    paddingTop: theme.spacing(5),
    backgroundColor: "#001524",
    margin: "0 !important",
    letterSpacing: "-.8px",
    wordSpacing: "4px",
  },

  contentFeatured: {
    gap: 15,
    padding: theme.spacing(5),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(10),
    backgroundColor: "#001524",
  },
  categoryFeatured: {
    gap: 15,
    padding: theme.spacing(5),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(10),
    backgroundColor: "#FFF",
  },

  carouselSection: {
    display: "none",
  },

  buttonSection: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#FFF",
    gap: 24,
    paddingBottom: 28,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    // Custom scrollbar styles
    "&::-webkit-scrollbar": {
      height: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f8f9fa",
      borderRadius: "4px",
      margin: "0 20px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "linear-gradient(90deg, #f1361d, #ff6b35)",
      borderRadius: "4px",
      "&:hover": {
        background: "linear-gradient(90deg, #d32f2f, #e55a2b)",
      },
    },
  },

  categorySection: {
    backgroundColor: "#FFF",
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },

  categoryName: {
    fontFamily: "Poppins",
    color: "#001524",
    fontSize: 18,
    fontWeight: 600,
    marginTop: theme.spacing(1),
    textAlign: "center",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#f1361d",
      transform: "translateY(-2px)",
    },
  },

  categoryButton: {
    fontFamily: "Poppins",
    width: 280,
    height: 280,
    color: "#FFF",
    borderRadius: 16,
    fontSize: 60,
    border: "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "block",
    margin: "0 auto",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(45deg, rgba(241, 54, 29, 0.1), rgba(255, 107, 53, 0.1))",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    "&:hover": {
      transform: "translateY(-8px) scale(1.05)",
      boxShadow: "0 15px 35px rgba(241, 54, 29, 0.3)",
      "&::before": {
        opacity: 1,
      },
      "& .explore-overlay": {
        opacity: 1,
      },
    },
    "&:active": {
      transform: "translateY(-4px) scale(1.02)",
    },
  },

  categoryHeader: {
    textAlign: "center",
    color: "#001524",
    fontSize: 48,
    fontFamily: "Poppins",
    fontWeight: 800,
    letterSpacing: "-1px",
    wordSpacing: "4px",
    marginBottom: theme.spacing(1),
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-8px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "80px",
      height: "4px",
      background: "linear-gradient(90deg, #f1361d, #ff6b35)",
      borderRadius: "2px",
    },
  },

  categoryDesc: {
    textAlign: "center",
    color: "#455A64",
    fontSize: 18,
    paddingBottom: theme.spacing(4),
    fontFamily: "Raleway",
    fontWeight: 400,
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: 1.6,
  },

  exploreOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(45deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.3s ease",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    textShadow: "0 2px 4px rgba(0,0,0,0.8)",
    zIndex: 1,
  },


  root: {
    flexGrow: 1,
  },
  searchs: {
    justifyContent: "center",
    display: "flex",
  },
  searchb: {
    backgroundColor: "white",
    height: "80%",
    width: "60%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #001524",
  },
  booksHeader: {
    textAlign: "center",
    color: "#001524",
    fontSize: 40,
    fontFamily: "Poppins",
    fontWeight: "bolder",
    paddingTop: theme.spacing(10),
    letterSpacing: "-.8px",
    wordSpacing: "4px",
  },
  booksDesc: {
    textAlign: "center",
    color: "#455A64",
    fontSize: 20,
    paddingBottom: theme.spacing(2),
    fontFamily: "Raleway",
  },
  scrollImg: {
    position: "absolute",
    right: 0,
    bottom: 40,
    height: 100,
  },
  mobileSearch: {
    display: "none",
  },
  "@media (max-width: 1600px)": {
    hero: {
      flexDirection: "column",
      height: "100vh",
      gap: 0,
      paddingTop: 0,
      justifyContent: "center",
    },
    heroHeader: {
      textAlign: "center",
      color: "#001524",
      fontSize: 60,
      fontFamily: "Poppins",
      fontWeight: "800",
      letterSpacing: -2,
      lineHeight: 1,
      wordSpacing: 4,
      width: 600,
      paddingBottom: 8,
    },
    heroDesc: {
      textAlign: "center",
      color: "#455A64",
      fontSize: 24,
      fontFamily: "Raleway",
      paddingBottom: 28,
      width: 584,
    },
    searchs: {
      justifyContent: "center",
    },
    heroImg: {
      height: 480,
    },
    content: {
      padding: 8,
    },
  },
  "@media (max-width: 700px)": {
    hero: {
      flexDirection: "column",
      height: "100vh",
      gap: 20,
      paddingTop: 0,
      justifyContent: "center",
    },
    heroCont: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
    },
    mobSearchs: {
      display: "flex",
      justifyContent: "center",
      padding: 32,
      paddingTop: 20,
    },
    mobSearchb: {
      backgroundColor: "white",
      height: "80%",
      width: "80%",
      padding: "12px",
      borderRadius: "5px",
      border: "1px solid #001524",
    },
    heroImg: {
      height: 280,
    },
    content: {
      padding: 4,
    },
    contentHeader: {
      fontSize: 32,
    },
    booksDesc: {
      fontSize: 12,
    },
    booksHeader: {
      fontSize: 32,
    },
    searchs: {
      display: "none",
    },
    mobileSearch: {
      display: "block",
      padding: 32,
      paddingTop: 20,
    },
    scrollImg: {
      position: "absolute",
      textAlign: "center",
      margin: "auto",
      left: 0,
      right: 0,
      bottom: 20,
      height: 100,
    },
    carouselSection: {
      display: "block",
      backgroundColor: "#FFF",
    },
    buttonSection: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      textAlign: "center",
      backgroundColor: "#FFF",
      gap: 20,
      paddingBottom: 28,
      overflowX: "auto",
      overflowY: "hidden",
      whiteSpace: "nowrap",
      padding: "10px 20px",
      // Custom scrollbar styles for mobile
      "&::-webkit-scrollbar": {
        height: "6px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#f0f0f0",
        borderRadius: "3px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#f1361d",
        borderRadius: "3px",
        "&:hover": {
          background: "#d32f2f",
        },
      },
    },
  },
  // Keyframe animations
  "@keyframes fadeInUp": {
    "0%": {
      opacity: 0,
      transform: "translateY(30px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));
