import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/system";

import theme from "../theme";

const linkStyle = {
  ml: "3%",
};

const navLinks = [
  { name: "Filmer", linkHref: "/movies" },
  { name: "Lorem", linkHref: "/movies" },
];
const handleClick = () => {
  console.log("loggin out");
};

const Navbar = (props) => {
  console.log(props.user);
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
              sx={{
                fontSize: 30,
              }}
            >
              MovieSwipe
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
                Login
              </Button>
            ) : (
              <Button color="inherit" sx={{ ml: "auto" }} onClick={handleClick}>
                Logout
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
