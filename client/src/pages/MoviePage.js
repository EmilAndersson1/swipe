import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { Box, ThemeProvider } from "@mui/system";
import Navbar from "../components/Navbar";
import { Image } from "mui-image";

import { getOneMovie, getUser } from "../api";

import theme from "../theme";

function MoviePage() {
  const [user, setUser] = useState("");
  const [movieInformation, setMovieInformation] = useState({});
  const { movie } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await getUser();
      const fetchedMovie = await getOneMovie(movie);
      console.log(fetchedMovie);
      fetchedMovie !== "no movie"
        ? setMovieInformation(fetchedMovie)
        : navigate("/404");
      setUser(fetchedUser.data.username);
    }
    fetchData();
  }, []);
  return (
    <>
      <Navbar user={user} />
      <Box
        sx={{
          "&:after": {
            height: "100vh",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            zIndex: -1,
            content: '""',
            opacity: 0.3,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieInformation.backdrop_path})`,
          },
          mt: 15,
        }}
      >
        <Container>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container spacing={5} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={4} sm={3} md={4}>
                {movieInformation.poster_path && (
                  <Box>
                    <Image
                      sx={{ boxShadow: "rgba(200, 200, 200, 0.5) 0 1px 30px" }}
                      fit="contain"
                      src={`https://image.tmdb.org/t/p/original/${movieInformation.poster_path}`}
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={4} sm={5} md={8}>
                <Typography variant="h4">{movieInformation.title} </Typography>
                <Typography variant="subtitle1">
                  {movieInformation.genres &&
                    movieInformation.genres
                      .map((genre) => genre.name)
                      .join(", ")}{" "}
                  • {movieInformation.runtime}m
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontStyle: "italic", mt: 2 }}
                >
                  "{movieInformation.tagline}"
                </Typography>
                <Typography variant="h5" sx={{ mt: 2 }}>
                  About
                </Typography>
                <Typography variant="subtitle1">
                  {movieInformation.overview}
                </Typography>
              </Grid>
            </Grid>
          </ThemeProvider>
        </Container>
      </Box>
    </>
  );
}

export default MoviePage;
