import React, { useState, useEffect } from "react";
import { Box, fontWeight } from "@mui/system";
import { Paper, Skeleton, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Image } from "mui-image";

import "swiper/swiper.scss";

const Popular = (props) => {
  const [movies, setMovies] = useState([]);
  const arraySkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    setMovies(props.movies);
  }, [props]);
  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Swiper
          spaceBetween={30}
          breakpoints={{
            299: { slidesPerView: 2, spaceBetween: 30 },
            399: { slidesPerView: 2, spaceBetween: 30 },
            499: { slidesPerView: 3, spaceBetween: 30 },
            599: { slidesPerView: 3, spaceBetween: 30 },
            699: { slidesPerView: 4, spaceBetween: 30 },
            799: { slidesPerView: 5, spaceBetween: 30 },
            899: { slidesPerView: 6, spaceBetween: 25 },
            999: { slidesPerView: 7, spaceBetween: 20 },
            2000: { slidesPerView: 8, spaceBetween: 20 },
          }}
        >
          {movies.length === 0
            ? arraySkeleton.map(() => (
                <SwiperSlide>
                  <Skeleton variant="rectangular" height={"12em"} />

                  <Typography variant="h5">
                    <Skeleton sx={{ mt: 1 }} />
                  </Typography>
                  <Typography variant="body2">
                    <Skeleton width={"80%"} />
                  </Typography>
                </SwiperSlide>
              ))
            : movies.map((movie, i) => (
                <SwiperSlide key={i}>
                  <Image
                    style={{
                      boxShadow: "rgba(90, 90, 90, 0.4) 0px 8px 24px",
                    }}
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  />

                  <Typography sx={{ mt: 1 }} variant="body1">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2">{movie.release_date}</Typography>
                </SwiperSlide>
              ))}
        </Swiper>
      </Box>
    </>
  );
};

export default Popular;
