import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container, Grid } from "@mui/material";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";

import { getOneUser } from "../api";

import Navbar from "../components/Navbar";
import PurpleBox from "../components/PurpleBox";

import theme from "../theme";
import FavoriteMovies from "../components/FavoriteMovies";
import Friends from "../components/Friends";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await getOneUser(username);
      !fetchedUser.data && navigate(`/404`);
      setUser(fetchedUser.data);
    }
    fetchData();
    return () => {
      setUser("");
    };
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
            <Grid item xs={4} sm={8} md={6}>
              <Typography variant="h4" sx={{ pl: 7 }}>
                {user.username}
              </Typography>
            </Grid>

            <Grid item xs={4} sm={8} md={12}>
              <Typography variant="h4" sx={{ pl: 7 }}>
                Your friends
              </Typography>
              <Friends />
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
              <Typography variant="h4" sx={{ pl: 7 }}>
                Favorite Movies
              </Typography>
              {user.favorites && (
                <FavoriteMovies
                  movies={user.favorites}
                  username={user.username}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
