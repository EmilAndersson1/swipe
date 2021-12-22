import React from "react";
// Core modules imports are same as usual
import { Navigation, Pagination } from "swiper";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.scss";

import Rating from "@mui/material/Rating";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";

const Movies = (props) => {
  console.log(props.movies);
  return (
    <>
      <Swiper
        style={{ marginTop: 20 }}
        spaceBetween={30}
        slidesPerView={1.2}
        centeredSlides
      >
        {props.movies.results?.map((movie) => (
          <SwiperSlide>
            <Paper
              sx={{
                opacity: 0.9,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "50vh",
                backgroundImage: `url(
                  https://image.tmdb.org/t/p/original${movie.backdrop_path}
                )`,
              }}
            >
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
    </>
  );
};

export default Movies;
