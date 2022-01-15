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
  Card,
  CardContent,
  CardMedia,
  AvatarGroup,
} from "@mui/material";
import { Box, ThemeProvider } from "@mui/system";
import Navbar from "../components/Navbar";
import { Image } from "mui-image";
import CircularProgress from "@mui/material/CircularProgress";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

import "swiper/swiper.scss";

import {
  getOneMovie,
  getProviders,
  getUser,
  getCredits,
  getSimilar,
} from "../api";
import { motion } from "framer-motion";

import theme from "../theme";

function MoviePage() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState([]);
  const [providersFlatrate, setProvidersFlatrate] = useState([]);
  const [credits, setCredits] = useState([]);
  const [crew, setCrew] = useState([]);
  const [similar, setSimilar] = useState([]);

  const [movieInformation, setMovieInformation] = useState({});
  const { movie } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await getUser();
      const fetchedMovie = await getOneMovie(movie);
      const fetchedProviders = await getProviders(movie);
      const fetchedCredits = await getCredits(movie);
      const fetchedSimilar = await getSimilar(movie);
      console.log(fetchedCredits.data);

      if (fetchedMovie !== "no movie") {
        if (fetchedProviders.data.SE) {
          fetchedProviders.data.SE.buy &&
            setProviders(fetchedProviders.data.SE.buy);
          fetchedProviders.data.SE.flatrate &&
            setProvidersFlatrate(fetchedProviders.data.SE.flatrate);
        }
        fetchedCredits.data.cast && setCredits(fetchedCredits.data.cast);
        fetchedCredits.data.crew && setCrew(fetchedCredits.data.crew);
        fetchedSimilar.data.results && setSimilar(fetchedSimilar.data.results);
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
    setLoading(true);
  }, [movie]);

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
                      {movieInformation.release_date.substring(0, 4)} •{" "}
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
                      {movieInformation.tagline &&
                        `"${movieInformation.tagline}"`}
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 2 }}>
                      About
                    </Typography>
                    <Typography variant="subtitle1">
                      {movieInformation.overview}
                    </Typography>

                    <>
                      <Typography variant="h5" sx={{ mt: 2 }}>
                        Buy here:
                      </Typography>
                      {providers.length === 0 ? (
                        <Typography>Not available in Sweden...</Typography>
                      ) : (
                        <Box>
                          <AvatarGroup
                            max={8}
                            sx={{
                              justifyContent: "start",
                              alignItems: "start",
                            }}
                          >
                            {providers.map((provider, i) => (
                              <Avatar
                                key={i}
                                src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                              />
                            ))}
                          </AvatarGroup>
                        </Box>
                      )}
                      <Typography variant="h5" sx={{ mt: 2 }}>
                        Stream here:
                      </Typography>
                      {providersFlatrate.length === 0 ? (
                        <Typography>Not available in Sweden...</Typography>
                      ) : (
                        <Box>
                          <AvatarGroup
                            max={8}
                            sx={{
                              alignItems: "start",
                              justifyContent: "start",
                            }}
                          >
                            {providersFlatrate.map((provider) => (
                              <Avatar
                                src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                              />
                            ))}
                          </AvatarGroup>
                        </Box>
                      )}
                    </>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            <Divider />
            <Container>
              <Typography variant="h4" sx={{ mt: 6, fontWeight: 600 }}>
                Similar titles
              </Typography>
              <Box sx={{}}>
                <Swiper
                  style={{ paddingTop: 30, paddingLeft: 10 }}
                  spaceBetween={30}
                  breakpoints={{
                    299: { slidesPerView: 1, spaceBetween: 30 },
                    399: { slidesPerView: 2, spaceBetween: 30 },
                    499: { slidesPerView: 2, spaceBetween: 30 },
                    599: { slidesPerView: 3, spaceBetween: 30 },
                    699: { slidesPerView: 4, spaceBetween: 30 },
                    799: { slidesPerView: 4, spaceBetween: 30 },
                    899: { slidesPerView: 4, spaceBetween: 25 },
                    999: { slidesPerView: 5, spaceBetween: 20 },
                    2000: { slidesPerView: 6, spaceBetween: 20 },
                  }}
                >
                  {similar.map((movie, i) => (
                    <SwiperSlide key={i} style={{}}>
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                          boxShadow: "rgba(200, 200, 200, 0.4) 0px 3px 10px",
                          cursor: "pointer",
                        }}
                      >
                        <Card sx={{ maxWidth: 300, mb: 5 }}>
                          <CardMedia
                            onClick={() => {
                              navigate(`/movie/${movie.id}`);
                              window.scrollTo(0, 0);
                            }}
                            component="img"
                            alt="movie_poster"
                            height="300"
                            image={
                              movie.poster_path
                                ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                                : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"
                            }
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {movie.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontStyle: "italic" }}
                              color="text.secondary"
                            >
                              {movie.release_date.substring(0, 4)}
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            </Container>

            <Divider />
            <Container>
              <Typography variant="h4" sx={{ mt: 3, fontWeight: 600 }}>
                Actors
              </Typography>
              <Box sx={{ mb: 6 }}>
                <Swiper
                  grabCursor
                  style={{ paddingTop: 20, paddingLeft: 10 }}
                  spaceBetween={30}
                  breakpoints={{
                    299: { slidesPerView: 2, spaceBetween: 30 },
                    399: { slidesPerView: 2, spaceBetween: 30 },
                    499: { slidesPerView: 3, spaceBetween: 30 },
                    599: { slidesPerView: 3, spaceBetween: 30 },
                    699: { slidesPerView: 4, spaceBetween: 30 },
                    799: { slidesPerView: 4, spaceBetween: 30 },
                    899: { slidesPerView: 4, spaceBetween: 25 },
                    999: { slidesPerView: 5, spaceBetween: 20 },
                    2000: { slidesPerView: 6, spaceBetween: 20 },
                  }}
                >
                  {credits.slice(0, 50).map((actor, i) => (
                    <SwiperSlide key={i}>
                      <Card sx={{ maxWidth: 300 }}>
                        <CardMedia
                          component="img"
                          alt="Actor"
                          height="300"
                          image={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"
                          }
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {actor.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontStyle: "italic" }}
                            color="text.secondary"
                          >
                            as {actor.character}
                          </Typography>
                        </CardContent>
                      </Card>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            </Container>
            <Divider />
            <Container>
              <Typography variant="h4" sx={{ mt: 3, fontWeight: 600 }}>
                Crew
              </Typography>
              <Box sx={{ mb: 6 }}>
                <Swiper
                  grabCursor
                  style={{ paddingTop: 20, paddingLeft: 10 }}
                  spaceBetween={30}
                  breakpoints={{
                    299: { slidesPerView: 2, spaceBetween: 30 },
                    399: { slidesPerView: 2, spaceBetween: 30 },
                    499: { slidesPerView: 3, spaceBetween: 30 },
                    599: { slidesPerView: 3, spaceBetween: 30 },
                    699: { slidesPerView: 4, spaceBetween: 30 },
                    799: { slidesPerView: 4, spaceBetween: 30 },
                    899: { slidesPerView: 4, spaceBetween: 25 },
                    999: { slidesPerView: 5, spaceBetween: 20 },
                    2000: { slidesPerView: 6, spaceBetween: 20 },
                  }}
                >
                  {crew
                    .slice(0, 50)
                    .filter(
                      (crewMember) =>
                        crewMember.job === "Director" ||
                        crewMember.job === "Producer"
                    )
                    .sort((a) => (a.job === "Director" ? -1 : 1))
                    .map((actor, i) => (
                      <SwiperSlide key={i}>
                        <Card sx={{ maxWidth: 300 }}>
                          <CardMedia
                            component="img"
                            alt="Actor"
                            height="300"
                            image={
                              actor.profile_path
                                ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                                : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"
                            }
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {actor.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontStyle: "italic" }}
                              color="text.secondary"
                            >
                              {actor.job}
                            </Typography>
                          </CardContent>
                        </Card>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </Box>
            </Container>
          </>
        )}
      </ThemeProvider>
    </>
  );
}

export default MoviePage;
