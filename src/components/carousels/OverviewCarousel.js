import ContentCardMin from "@components/cards/ContentCardMin";
import { Box, Stack } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const OverviewCarousel = ({ contents = [] }) => {
  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 3,
    initialSlide: 0,
    variableWidth: true,
    swipeToSlide: true,
  };

  return (
    <Slider {...settings}>
      {contents.map((content, i) => (
        <Stack
          direction="row"
          alignItems="center"
          key={i}
          sx={{ display: "flex !important", p: 1 }}
        >
          <ContentCardMin {...content} />
          {i < contents.length - 1 && <ArrowForwardIcon sx={{ ml: 1 }} />}
        </Stack>
      ))}
    </Slider>
  );
};

export default OverviewCarousel;
