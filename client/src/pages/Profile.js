import React, { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container, Grid, Paper } from "@mui/material";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";

import { getUser } from "../api";

import Navbar from "../components/Navbar";

import theme from "../theme";

const Profile = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await getUser();

      setUser(fetchedUser.data.username);
    }
    fetchData();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar user={user} />
      <Box
        sx={{
          height: "200px",
          bgcolor: "primary.main",
          borderRadius: "0 0 50% 50%",
        }}
      ></Box>
      <Container disableGutters>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          columns={{ xs: 4, sm: 8, md: 12 }}
        ></Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
