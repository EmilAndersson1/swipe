import React, { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container, Grid, Paper } from "@mui/material";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";

import { getUser } from "../api";

import Navbar from "../components/Navbar";
import PurpleBox from "../components/PurpleBox";

import theme from "../theme";
import FavoriteMovies from "../components/FavoriteMovies";
import Friends from "../components/Friends";

const Profile = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await getUser();
      setUser(fetchedUser.data);
    }
    fetchData();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar user={user.username} />
      <PurpleBox text={`Profile`} />
      <Container disableGutters>
        <Box
          sx={{
            backgroundColor: "#333333",
            mt: 5,
            borderRadius: 10,
            minHeight: "70vh",
            mb: 10,
            pb: 10,
          }}
        >
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4} sm={6} md={6}>
              <Typography variant="h4" sx={{ p: 7 }}>
                {user.username}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4" sx={{ p: 7 }}>
              Friends
            </Typography>
            <Friends />
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4" sx={{ p: 7 }}>
              Favorite Movies
            </Typography>
            {user.favorites && <FavoriteMovies movies={user.favorites} />}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
