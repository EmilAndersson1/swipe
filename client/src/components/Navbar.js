import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";

import theme from "../theme";

import { logout } from "../api";

const Navbar = (props) => {
  let navigate = useNavigate();
  const linkStyle = {
    ml: "3%",
  };

  const navLinks = [
    { name: "Movies", linkHref: "/swipe" },
    { name: "About Us", linkHref: "/about-us" },
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const logoutSuccess = logout();
    console.log(logoutSuccess);
    if (logoutSuccess.data === "Success") {
      navigate(`/profile`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar sx={{ bgcolor: "primary" }}>
        <Container>
          <Toolbar disableGutters>
            <Link
              color="textPrimary"
              to="/"
              underline="none"
              component={RouterLink}
            >
              <img
                src="https://i.ibb.co/s1pp6y9/movied1.png"
                alt="MoviedLogo"
                border="0"
                style={{ height: 55, paddingTop: 10 }}
              />
            </Link>
            {navLinks.map((link) => (
              <Link
                color="textPrimary"
                to={link.linkHref}
                underline="none"
                component={RouterLink}
                sx={{
                  ...linkStyle,
                  display: {
                    md: "block",
                  },
                }}
              >
                {link.name}
              </Link>
            ))}

            {props.user === undefined ? (
              <Button
                color="inherit"
                sx={{ ml: "auto" }}
                component={RouterLink}
                to="/login"
              >
                Login / Register
              </Button>
            ) : (
              <div style={{ marginLeft: "auto" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle sx={{ fontSize: 30 }} />
                  <span style={{ marginLeft: 6, fontSize: 20 }}>
                    {props.user}
                  </span>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={RouterLink} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
