import React, { useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  Grid,
  Typography,
  Divider,
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
import SearchBox from "../components/Frontpage/SearchBox";

function Homepage() {
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
        <Box
          sx={{
            marginTop: 14,
            height: "100%",
            backgroundImage: {
              xs: `url("background-swipe-xs.png")`,
              sm: `url("background-swipe.jpg")`,
              md: `url("background-swipe.jpg")`,
            },
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Container>
            <Grid container spacing={5} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={4} sm={3} md={5}>
                <Box sx={{ my: 6 }}></Box>
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
                <SearchBox />
              </Grid>
            </Grid>
          </Container>
          <Divider />
        </Box>
        <Container sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }} vairant="h6">
            POPULAR MOVIES
          </Typography>
          <Popular movies={popularMovies} />
        </Container>
        <Divider />
        <Container sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }} vairant="h6">
            TOP-RATED MOVIES
          </Typography>
          <Popular movies={topRatedMovies} />
        </Container>
        <Divider />
        <Container sx={{ mt: 4, mb: 6 }}>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }} vairant="h6">
            NOW PLAYING
          </Typography>
          <Popular movies={nowPlayingMovies} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Homepage;
