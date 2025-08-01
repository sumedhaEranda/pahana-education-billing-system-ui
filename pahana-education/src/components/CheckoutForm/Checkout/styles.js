import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  toolbar: theme.mixins.toolbar,
  layout: {
    marginTop: '5%',
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: 60,
    },
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  divider: {
    margin: '20px 0',
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: "5%",
    color: "#1a202c",
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
    fontSize: "2.5rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textAlign: "center",
    marginBottom: "32px",
  },
  emptyButton: {
    minWidth: "150px",
    borderRadius: "16px",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    fontWeight: "600",
    textTransform: "none",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
      transform: "translateY(-3px)",
      boxShadow: "0 12px 35px rgba(102, 126, 234, 0.4)",
    },
  },
  checkoutButton: {
    minWidth: "150px",
    borderRadius: "16px",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    fontWeight: "600",
    textTransform: "none",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
      transform: "translateY(-3px)",
      boxShadow: "0 12px 35px rgba(102, 126, 234, 0.4)",
    },
  },
  link: {
    textDecoration: "none",
    color: "#667eea",
    fontWeight: "600",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#5a6fd8",
      textDecoration: "underline",
    },
  },
  cardDetails: {
    display: "flex",
    marginTop: "10%",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: "24px",
    padding: "32px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
  },
  checkoutContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: "24px",
    padding: "32px",
    margin: "24px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "20px",
    padding: "32px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  formTitle: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
    fontSize: "1.5rem",
    color: "#1a202c",
    marginBottom: "24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  formField: {
    marginBottom: "20px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 1)",
        transform: "translateY(-3px)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      },
      "&.Mui-focused": {
        backgroundColor: "rgba(255, 255, 255, 1)",
        transform: "translateY(-3px)",
        boxShadow: "0 10px 30px rgba(102, 126, 234, 0.2)",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(102, 126, 234, 0.3)",
      borderWidth: "2px",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#667eea",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#667eea",
      borderWidth: "2px",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "32px",
    gap: "16px",
  },
  navigationButton: {
    borderRadius: "16px",
    padding: "12px 24px",
    fontWeight: "600",
    textTransform: "none",
    fontSize: "16px",
    transition: "all 0.3s ease",
    "&.MuiButton-outlined": {
      borderColor: "#667eea",
      color: "#667eea",
      "&:hover": {
        borderColor: "#5a6fd8",
        backgroundColor: "rgba(102, 126, 234, 0.05)",
        transform: "translateY(-2px)",
      },
    },
    "&.MuiButton-contained": {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
      "&:hover": {
        background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
        transform: "translateY(-3px)",
        boxShadow: "0 12px 35px rgba(102, 126, 234, 0.4)",
      },
    },
  },
  errorMessage: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    color: "#e53e3e",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "24px",
    fontFamily: "Inter, sans-serif",
    fontWeight: "500",
    border: "1px solid rgba(239, 68, 68, 0.2)",
  },
  successMessage: {
    backgroundColor: "rgba(56, 161, 105, 0.1)",
    color: "#38a169",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "24px",
    fontFamily: "Inter, sans-serif",
    fontWeight: "500",
    border: "1px solid rgba(56, 161, 105, 0.2)",
  },
  "@media (max-width: 960px)": {
    checkoutContainer: {
      margin: "16px",
      borderRadius: "20px",
      padding: "24px",
    },
    cardDetails: {
      flexDirection: "column",
      alignItems: "center",
      gap: "24px",
      borderRadius: "20px",
      padding: "24px",
    },
    title: {
      fontSize: "2rem",
    },
    stepper: {
      padding: "20px",
      borderRadius: "16px",
    },
    formContainer: {
      padding: "24px",
      borderRadius: "16px",
    },
    buttonContainer: {
      flexDirection: "column",
    },
  },
  "@media (max-width: 600px)": {
    checkoutContainer: {
      margin: "12px",
      borderRadius: "16px",
      padding: "20px",
    },
    cardDetails: {
      borderRadius: "16px",
      padding: "20px",
    },
    title: {
      fontSize: "1.75rem",
    },
    stepper: {
      padding: "16px",
      borderRadius: "12px",
    },
    formContainer: {
      padding: "20px",
      borderRadius: "12px",
    },
    formTitle: {
      fontSize: "1.25rem",
    },
  },
}));
