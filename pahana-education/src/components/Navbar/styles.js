import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    color: "white",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    background: "rgba(0, 21, 36, 0.95)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s ease",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    fontFamily: "Raleway",
    fontWeight: 600,
    letterSpacing: 1,
    textDecoration: "none",
    "&:hover": {
      color: "#ffff",
      boxShadow: "none",
    },
  },
  cartt: {
    "&:hover": {
      color: "#ffff",
      boxShadow: "none",
    },
  },
  image: {
    marginRight: "10px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  button: {
    marginRight: theme.spacing(2),
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(2),
  },
  loginButton: {
    textTransform: "none",
    fontWeight: 600,
    borderRadius: "8px",
    padding: "8px 16px",
    borderColor: "rgba(255, 255, 255, 0.3)",
    color: "white",
    "&:hover": {
      borderColor: "white",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  userButton: {
    padding: "4px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  avatar: {
    width: "32px",
    height: "32px",
    fontSize: "14px",
    fontWeight: 600,
  },
  userMenu: {
    "& .MuiPaper-root": {
      borderRadius: "12px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
      border: "1px solid rgba(0, 0, 0, 0.08)",
    },
  },
  menuItem: {
    padding: "12px 16px",
    minWidth: "200px",
    "&:hover": {
      backgroundColor: "rgba(102, 126, 234, 0.08)",
    },
  },
  menuIcon: {
    marginRight: theme.spacing(1),
    fontSize: "20px",
  },
}));
