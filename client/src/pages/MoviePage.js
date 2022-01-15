import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Typography,
  Rating,
  Tooltip,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import { Box, ThemeProvider } from "@mui/system";
import Navbar from "../components/Navbar";
import { Image } from "mui-image";
import CircularProgress from "@mui/material/CircularProgress";

import { getOneMovie, getProviders, getUser } from "../api";

import theme from "../theme";

function MoviePage() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState();

  const [movieInformation, setMovieInformation] = useState({});
  const { movie } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await getUser();
      const fetchedMovie = await getOneMovie(movie);

      if (fetchedMovie !== "no movie") {
        setMovieInformation(fetchedMovie);
        setLoading(false);
      } else {
        navigate("/404");
      }

      setUser(fetchedUser.data.username);
    }
    fetchData();
  }, [movie]);

  useEffect(() => {
    async function fetchData() {
      console.log(movieInformation.id);
      const fetchedProviders = await getProviders(movieInformation.id);
      console.log(fetchedProviders);
      setProviders(fetchedProviders.data);
    }
    fetchData();
  }, [movieInformation]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar user={user} />
        {loading ? (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <>
            <Box
              sx={{
                "&::before": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  top: 0,
                  left: 0,
                  backgroundColor: " rgba(0,0,0,0.8)",
                },
                paddingBottom: 4,
                marginTop: 15,
                position: "relative",
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieInformation.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Container sx={{ position: "relative", zIndex: 1 }}>
                <Grid container spacing={5} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={4} sm={3} md={4}>
                    {movieInformation.poster_path && (
                      <Image
                        height="400px"
                        fit="contain"
                        src={`https://image.tmdb.org/t/p/original/${movieInformation.poster_path}`}
                      />
                    )}
                  </Grid>
                  <Grid item xs={4} sm={5} md={8}>
                    <Typography variant="h4">
                      {movieInformation.title}{" "}
                    </Typography>

                    <Typography variant="subtitle1">
                      {movieInformation.release_date} •{" "}
                      {movieInformation.genres &&
                        movieInformation.genres
                          .map((genre) => genre.name)
                          .join(", ")}{" "}
                      • {movieInformation.runtime}m
                    </Typography>
                    <Tooltip
                      title={movieInformation.vote_average / 2}
                      placement="bottom"
                      arrow
                    >
                      <span>
                        <Rating
                          readOnly
                          value={movieInformation.vote_average / 2}
                          precision={0.5}
                          sx={{ mt: 1 }}
                        />
                      </span>
                    </Tooltip>

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
                    {providers && (
                      <>
                        <Typography variant="h5" sx={{ mt: 2 }}>
                          Buy here:
                        </Typography>
                        <Box>
                          <AvatarGroup max={6}>
                            {providers.buy.map((provider) => (
                              <Avatar
                                sx={{
                                  justifyContent: "start",
                                  alignItems: "start",
                                }}
                                src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                              />
                            ))}
                          </AvatarGroup>
                        </Box>
                        <Typography variant="h5" sx={{ mt: 2 }}>
                          Stream here:
                        </Typography>
                        <Box>
                          <AvatarGroup
                            max={6}
                            sx={{
                              alignItems: "start",
                              justifyContent: "start",
                            }}
                          >
                            {providers.flatrate.map((provider) => (
                              <Avatar
                                src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                              />
                            ))}
                          </AvatarGroup>
                        </Box>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Container>
            </Box>
            <Divider />
          </>
        )}
      </ThemeProvider>
    </>
  );
}

export default MoviePage;
