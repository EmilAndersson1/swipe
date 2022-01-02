import React, { useState, useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.scss";

import Rating from "@mui/material/Rating";

import { Button, Typography, Snackbar, Alert, Fade } from "@mui/material";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { postFavorite } from "../api";

const Movies = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);

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
      {movies.length === 0 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6">Loading...</Typography>
        </Box>
      )}
      <Fade in={movies.length > 0} timeout={{ enter: 2000 }}>
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
            {movies.map((movie, i) => (
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
                    <Button variant="contained" onClick={handleInfo}>
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
                  <div style={{ position: "absolute", bottom: 0, padding: 20 }}>
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
                      sx={{ color: "white", textShadow: "1px 1px darkgray" }}
                    >
                      {movie.overview.substring(0, 250)}
                      {movie.overview.length > 250 ? "..." : null}
                    </Typography>
                  </div>
                </Paper>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Fade>

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
