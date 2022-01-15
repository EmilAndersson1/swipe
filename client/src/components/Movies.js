import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.scss";

import Rating from "@mui/material/Rating";

import { Button, Typography, Snackbar, Alert, Fade } from "@mui/material";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { postFavorite } from "../api";

const Movies = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const swiper = useRef();

  useEffect(() => {
    setMovies(
      props.movies.filter((movie, i) => {
        for (let i = 0; i < props.userInfo.favorites.length; i++) {
          if (props.userInfo.favorites[i].movie_id == movie.id) return false;
        }
        return true;
      })
    );
  }, [props]);

  const handleInfo = () => {
    console.log("info");
  };

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const deleteMovie = () => {
    var temp = [...movies];
    temp.splice(currentIndex, 1);
    setMovies(temp);
  };

  useEffect(() => {
    swiper.current.swiper.update();
  }, [movies]);

  return (
    <>
      <div>
        <Swiper
          style={{ marginTop: 20 }}
          spaceBetween={30}
          slidesPerView={1.2}
          centeredSlides
          onSlideChange={(e) => {
            console.log(props.movies);
            setCurrentIndex(e.realIndex);
          }}
          ref={swiper}
        >
          {movies.length === 0 ? (
            <SwiperSlide>
              <Paper
                sx={{
                  opacity: 0.9,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "60vh",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 3,
                  }}
                >
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    width={70}
                    height={70}
                  />
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    width={70}
                    height={70}
                  />
                </Box>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    padding: 30,
                    width: "100%",
                  }}
                >
                  <Skeleton
                    animation="wave"
                    height={50}
                    sx={{
                      width: {
                        xs: "60%",
                        sm: "40%",
                        md: "30%",
                      },
                      mb: 1,
                    }}
                  />
                  <Skeleton
                    animation="wave"
                    height={30}
                    sx={{
                      width: {
                        xs: "50%",
                        sm: "40%",
                        md: "20%",
                      },
                      mb: 1,
                    }}
                  />
                  <Skeleton
                    animation="wave"
                    height={20}
                    sx={{
                      width: {
                        xs: "75%",
                        sm: "80%",
                        md: "90%",
                      },
                    }}
                  />
                  <Skeleton
                    animation="wave"
                    height={20}
                    sx={{
                      width: {
                        xs: "75%",
                        sm: "80%",
                        md: "90%",
                      },
                    }}
                  />
                  <Skeleton
                    animation="wave"
                    height={20}
                    sx={{
                      width: {
                        xs: "60%",
                        sm: "70%",
                        md: "80%",
                      },
                    }}
                  />
                </div>
              </Paper>
            </SwiperSlide>
          ) : (
            movies.map((movie, i) => (
              <Fade in={movies.length > 0} timeout={{ enter: 2000 }}>
                <SwiperSlide key={i}>
                  <Paper
                    sx={{
                      opacity: 0.9,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "60vh",
                      backgroundImage: `url(
          https://image.tmdb.org/t/p/original${movie.backdrop_path}
        )`,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        p: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => navigate(`/movie/${movie.id}`)}
                      >
                        More info
                      </Button>
                      <Button
                        sx={{ py: 2 }}
                        variant="contained"
                        onClick={() => {
                          let posterPath = movie.poster_path.substring(1);
                          setTimeout(() => {
                            deleteMovie();
                          }, 1000);

                          postFavorite(
                            movie.id,
                            movie.title,
                            posterPath,
                            props.username
                          );
                          handleClick();
                        }}
                      >
                        <FavoriteIcon />
                      </Button>
                    </Box>
                    <div
                      style={{ position: "absolute", bottom: 0, padding: 20 }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          color: "white",
                          fontWeight: 550,
                          textShadow: "1px 1px darkgray",
                        }}
                      >
                        {movie.title}
                      </Typography>
                      <Rating
                        value={movie.vote_average / 2}
                        readOnly
                        precision={0.2}
                        size="large"
                      />

                      <Typography
                        variant="body1"
                        sx={{
                          color: "white",
                          textShadow: "1px 1px darkgray",
                        }}
                      >
                        {movie.overview.substring(0, 150)}
                        {movie.overview.length > 150 ? "..." : null}
                      </Typography>
                    </div>
                  </Paper>
                </SwiperSlide>
              </Fade>
            ))
          )}
        </Swiper>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          sx={{ width: "100%", background: "darkgreen" }}
        >
          Added to favorites!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Movies;
