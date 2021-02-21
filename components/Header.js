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

export default function Header() {
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
      <div className="root-header">
        <AppBar position="static" className="navbar">
          <Toolbar>
            <Typography variant="h6" className="title-header">
              SMILE<samp className="samp">SME</samp>
            </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar style={{ color: "#f88f01", backgroundColor: "#fff" }} />
                <span className="user">Mr.Admin</span>
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
