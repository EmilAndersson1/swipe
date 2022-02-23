import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Divider,
  Drawer,
  List,
  Box,
  ListItem,
  ListItemText,
  Toolbar,
} from "@mui/material";

import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import InfoIcon from "@mui/icons-material/Info";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { ListItemIcon } from "@mui/material";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import theme from "../theme";
import { logout } from "../api";
import { motion } from "framer-motion";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Navbar = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  let navigate = useNavigate();
  const linkStyle = {
    ml: "3%",
    "&:hover": { color: "gray" },
  };

  const navLinks = [
    { name: "Swipe", linkHref: "/swipe" },
    { name: "Find Friends", linkHref: "/find-friends" },
    { name: "About Us", linkHref: "/about-us" },
  ];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const logoutSuccess = logout();
    if (logoutSuccess.data === "Success") {
      navigate(`/profile`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar sx={{ bgcolor: "primary", py: 1 }}>
        <Container>
          <Toolbar disableGutters>
            <Link
              color="textPrimary"
              to="/"
              underline="none"
              component={RouterLink}
            >
              <motion.img
                whileHover={{
                  scale: 1.07,
                }}
                src="https://i.ibb.co/s1pp6y9/movied1.png"
                alt="MoviedLogo"
                border="0"
                style={{ height: 55, paddingTop: 10 }}
              />
            </Link>
            {navLinks.map((link, i) => (
              <Link
                key={i}
                color="textPrimary"
                to={link.linkHref}
                underline="none"
                component={RouterLink}
                sx={{
                  ...linkStyle,
                  display: { xs: "none", sm: "block", md: "block" },
                }}
              >
                {link.name}
              </Link>
            ))}

            {props.user === undefined ? (
              <Button
                color="inherit"
                sx={{
                  ml: "auto",
                  display: { xs: "none", sm: "block", md: "block" },
                }}
                component={RouterLink}
                to="/login"
              >
                Login / Register
              </Button>
            ) : (
              <div
                style={{
                  marginLeft: "auto",
                  display: { xs: "none", sm: "block", md: "block" },
                }}
              >
                <Button
                  size="large"
                  startIcon={<AccountBoxIcon />}
                  onClick={handleMenu}
                  sx={{
                    textTransform: "none",
                    fontSize: 23,
                    display: {
                      xs: "none",
                      sm: "inline-flex",
                      md: "inline-flex",
                    },
                  }}
                >
                  {props.user}
                </Button>

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
                  <MenuItem
                    component={RouterLink}
                    to={`/profile/${props.user}`}
                    onClick={handleClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
            <IconButton
              aria-label="drawer"
              size="large"
              onClick={() => setOpenDrawer(true)}
              sx={{
                display: { sx: "block", sm: "none", md: "none" },
                ml: "auto",
              }}
            >
              <MenuRoundedIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Toolbar>
        </Container>
        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Box sx={{ width: "280px" }}>
            <div>
              <IconButton onClick={() => setOpenDrawer(false)}>
                <CloseRoundedIcon sx={{ m: 1, fontSize: 30 }} />
              </IconButton>
            </div>
            <Divider />
            <List>
              {navLinks.map((link, i) => (
                <ListItem key={i}>
                  <ListItemIcon onClick={() => navigate(`${link.linkHref}`)}>
                    {link.name === "About Us" && <InfoIcon fontSize="large" />}
                    {link.name === "Find Friends" && (
                      <PersonSearchIcon fontSize="large" />
                    )}
                    {link.name === "Swipe" && (
                      <LocalMoviesIcon fontSize="large" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    sx={{ fontSize: 20, mt: 1 }}
                    color="textPrimary"
                    underline="none"
                    onClick={() => navigate(`${link.linkHref}`)}
                  >
                    {link.name}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
            <Divider />

            <Divider />
            {props.user === undefined ? (
              <List>
                <ListItem>
                  <ListItemIcon onClick={() => navigate("/login")}>
                    <LoginIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    sx={{ mr: 22, fontSize: 20, mt: 1 }}
                    color="textPrimary"
                    underline="none"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </ListItemText>
                </ListItem>
              </List>
            ) : (
              <List>
                <ListItem>
                  <ListItemIcon
                    onClick={() => navigate(`/profile/${props.user}`)}
                  >
                    <AccountBoxIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    sx={{ mr: 22, fontSize: 20, mt: 1 }}
                    color="textPrimary"
                    underline="none"
                    onClick={() => navigate(`/profile/${props.user}`)}
                  >
                    Profile
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon onClick={handleLogout}>
                    <LogoutIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    sx={{ mr: 22, fontSize: 20, mt: 1 }}
                    color="textPrimary"
                    underline="none"
                    onClick={handleLogout}
                  >
                    Logout
                  </ListItemText>
                </ListItem>
              </List>
            )}
          </Box>
        </Drawer>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
