import React, { useState } from "react";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom"


const useStyles = makeStyles(()=>({
    link:{
        textDecoration:"none",
        color: "blue",
        fontSize: "20px",
    },
    icon:{
        color: "white"
    }
}));

function DrawerComponent() {
    const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.removeItem("userData")
    navigate("/")
  };
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {window.location.href==="http://localhost:3000/"?
            <Link to="/register" className={classes.link}>
             Sign Up
            </Link>:
            window.location.href==="http://localhost:3000/register"?
            <Link to="/" className={classes.link}>
            Login
           </Link>:
           <div>
        <List>
        <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/home" className={classes.link}>Home</Link>
            </ListItemText>
          </ListItem>
          <Divider/>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/product" className={classes.link}>Product</Link>
            </ListItemText>
          </ListItem>
          <Divider/>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/admin-login" className={classes.link}>admin</Link>
            </ListItemText>
          </ListItem>
          <Divider/>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/" className={classes.link}>
                <Button id="fade-button" onClick={handleClick}>
                      Log Out
                </Button>
              </Link>
            </ListItemText>
          </ListItem>
          <Divider/>
        </List>
        </div>}
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}className={classes.icon}>
        <MenuIcon />
      </IconButton>
    </>
  );
}

export default DrawerComponent;