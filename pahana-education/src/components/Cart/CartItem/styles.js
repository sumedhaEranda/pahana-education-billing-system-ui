import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "24px",
    marginBottom: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: "24px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 15px 50px rgba(0, 0, 0, 0.15)",
    },
  },
  media: {
    height: 0,
    paddingTop: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "120px",
  },
  productName: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "600",
    fontSize: "1.25rem",
    color: "#1a202c",
    marginBottom: "8px",
    lineHeight: "1.3",
  },
  productDescription: {
    fontFamily: "Inter, sans-serif",
    fontSize: "0.95rem",
    color: "#4a5568",
    lineHeight: "1.4",
    marginBottom: "12px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  productPrice: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
    fontSize: "1.5rem",
    color: "#667eea",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "8px",
  },
  quantitySection: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginTop: "12px",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  quantityButton: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minWidth: '40px',
    height: '40px',
    borderRadius: '50%',
    '&:hover': {
      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
    },
  },
  quantityText: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "600",
    fontSize: "1.1rem",
    color: "#1a202c",
    minWidth: "32px",
    textAlign: "center",
  },
  removeButton: {
    borderRadius: "12px",
    minWidth: "40px",
    height: "40px",
    background: "rgba(239, 68, 68, 0.1)",
    color: "#ef4444",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "rgba(239, 68, 68, 0.2)",
      transform: "scale(1.05)",
    },
  },
  totalPrice: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
    fontSize: "1.75rem",
    color: "#1a202c",
    textAlign: "right",
    marginLeft: "auto",
    paddingLeft: "24px",
  },
  stockInfo: {
    fontFamily: "Inter, sans-serif",
    fontSize: "0.85rem",
    color: "#38a169",
    fontWeight: "500",
    marginTop: "4px",
  },
  outOfStock: {
    color: "#e53e3e",
  },
  "@media (max-width: 960px)": {
    root: {
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "20px",
      borderRadius: "20px",
    },
    media: {
      width: "100px",
      height: "100px",
      marginRight: "0",
      marginBottom: "16px",
    },
    content: {
      width: "100%",
      minHeight: "auto",
    },
    quantitySection: {
      justifyContent: "space-between",
      width: "100%",
    },
    totalPrice: {
      textAlign: "left",
      marginLeft: "0",
      paddingLeft: "0",
      marginTop: "12px",
    },
  },
  "@media (max-width: 600px)": {
    root: {
      padding: "16px",
      borderRadius: "16px",
    },
    media: {
      width: "80px",
      height: "80px",
    },
    productName: {
      fontSize: "1.1rem",
    },
    productDescription: {
      fontSize: "0.9rem",
    },
    productPrice: {
      fontSize: "1.25rem",
    },
    totalPrice: {
      fontSize: "1.5rem",
    },
    quantityButton: {
      minWidth: "36px",
      height: "36px",
    },
    removeButton: {
      minWidth: "36px",
      height: "36px",
    },
    quantityText: {
      fontSize: "1rem",
    },
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
  },
  cartActions: {
    justifyContent: 'space-between',
    padding: '16px',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  button: {
    color: 'white',
    width: '100%',
    height: '40px',
    borderRadius: '8px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
}));
