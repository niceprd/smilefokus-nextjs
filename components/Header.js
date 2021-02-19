import {
  AppBar,
  Avatar,
  FormControlLabel,
  FormGroup,
  IconButton,
  makeStyles,
  Menu,
  Switch,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 25,
  },
  navbar: {
    backgroundColor: "#000",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#f88f01",
  },
  samp: {
    fontSize: 24,
    color: "#fff",
  },
  user: {
    marginLeft: 5,
    textTransform: "uppercase",
    fontSize: 20,
    color: "#f88f01",
  },
}));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              SMILE<samp className={classes.samp}>SME</samp>
            </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar /> <span className={classes.user}>Mr.Admin</span>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
}
