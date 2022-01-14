import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { Box, ThemeProvider } from "@mui/system";
import Navbar from "../components/Navbar";

import {
  getUser,
  getPopularMovies,
  getTopratedMovies,
  getNowplayingMovies,
} from "../api";

import theme from "../theme";
import Popular from "../components/Frontpage/Popular";

function Homepage() {
  const styles = {
    "&:hover": {
      boxShadow: "rgba(80, 63, 205, 0.5) 0 1px 30px",
      transitionDuration: " 0.3s",
      transform: "translateY(-2px)",
    },
  };

  const [user, setUser] = useState("");
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await getUser();
      const fetchedMoviesPopular = await getPopularMovies();
      const fetchedMoviesToprated = await getTopratedMovies();
      const fetchedMoviesNowplaying = await getNowplayingMovies();
      setPopularMovies(fetchedMoviesPopular.data.results);
      setNowPlayingMovies(fetchedMoviesNowplaying.data.results);
      setTopRatedMovies(fetchedMoviesToprated.data.results);

      setUser(fetchedUser.data.username);
    }
    fetchData();
  }, []);
  return (
    <div>
      <Navbar user={user} />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          style={{
            marginTop: 60,
            height: "100%",
            backgroundImage: `url("background-swipe.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Container>
            <Grid container spacing={5} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={4} sm={3} md={5}>
                <Box sx={{ my: 6 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 400,
                      mt: 6,
                      color: "white",
                      textShadow: "1px 1px darkgray",
                    }}
                  >
                    Movied - Swipe away
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mt: 2,
                      color: "white",
                      textShadow: "1px 1px darkgray",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={4}
                sm={5}
                md={7}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button variant="contained" sx={{ ...styles, mt: 2, p: 3 }}>
                  SWIPE NOW
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>
        <Container sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ mt: 2 }} vairant="h6">
            POPULAR MOVIES
          </Typography>
          <Popular movies={popularMovies} />
          <Typography variant="h5" sx={{ mt: 2 }} vairant="h6">
            TOP-RATED MOVIES
          </Typography>
          <Popular movies={topRatedMovies} />
          <Typography variant="h5" sx={{ mt: 2 }} vairant="h6">
            NOW PLAYING
          </Typography>
          <Popular movies={nowPlayingMovies} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Homepage;
