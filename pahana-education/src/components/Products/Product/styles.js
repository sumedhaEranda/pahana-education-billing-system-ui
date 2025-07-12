import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    '&:hover': {
      transform: "translateY(-8px)",
      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
    },
  },
  media: {
    height: 0,
    paddingTop: '120%',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 20px',
    backgroundColor: '#f8f9fa',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
    minHeight: '120px',
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    width: '100%',
    height: '44px',
    borderRadius: '8px',
    fontWeight: '600',
    textTransform: 'none',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)',
    },
  },
  cardContentName: {
    fontSize: "18px",
    textAlign: "center",
    margin: "8px 0 !important",
    fontWeight: "600",
    color: "#2c3e50",
    lineHeight: "1.3",
    minHeight: "48px",
  },
  cardContentPrice: {
    fontSize: "22px",
    color: "#e74c3c",
    margin: "8px 0 !important",
    fontWeight: "700",
    textAlign: "center",
  },
  cardContentDesc: {
    fontSize: "14px",
    color: "#7f8c8d",
    textAlign: "center",
    margin: "8px 0 !important",
    lineHeight: "1.4",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  stockInfo: {
    fontSize: "12px",
    color: "#27ae60",
    textAlign: "center",
    margin: "4px 0 !important",
    fontWeight: "500",
  },
  '@media (max-width: 700px)': {
    cardContentName: {
      fontSize: "16px",
      minHeight: "40px",
    },
    cardContentPrice: {
      fontSize: "20px",
    },
    cardContentDesc: {
      fontSize: "13px",
    },
    stockInfo: {
      fontSize: "10px",
    },
  },
}));
