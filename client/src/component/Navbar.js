import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import StoreIcon from '@mui/icons-material/Store';


const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  useEffect(()=>{
    console.log("Use Effect Called")
  },[])


  const handleClick = () => {
    localStorage.removeItem("userData")
    navigate("/")
  };

  const navigate = useNavigate()

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar >
        <Typography variant="h5" className={classes.logo} sx={{display:"flex"}}> 
          <Button component={Link} to="/home" sx={{color:"white",fontSize:25}}><StoreIcon sx={{fontSize:30, mr:2}}/> FASHION SPACE</Button>
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            {window.location.href==="http://localhost:3000/"?
            <Link to="/register" className={classes.link}>
             <Button id="fade-button"> Sign Up</Button>
            </Link>:
            window.location.href==="http://localhost:3000/register"?
            <Link to="/" className={classes.link}>
            <Button id="fade-button">Login</Button>
           </Link>:
            <div>
              <Link to="/home" className={classes.link}>
              Home
            </Link>
            <Link to="/product" className={classes.link}>
              Product
            </Link>
            <Link to="/admin-login" className={classes.link}>
              Admin
            </Link>
            <Link to="/" className={classes.link}>
                    <Button
                      id="fade-button" onClick={handleClick}
                    >
                      Log Out
                    </Button>
            </Link></div>}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
