import StudioRequestsCard from "@components/cards/StudioRequestsCard";
import { Stack, useTheme } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const StudioEditsCarousel = ({ requests = [] }) => {
  const theme = useTheme();
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
      {requests.map((req) => {
        return (
          <Stack
            direction="row"
            alignItems="center"
            key={req._id}
            sx={{ display: "flex !important", p: 1 }}
          >
            <StudioRequestsCard {...req} />
          </Stack>
        );
      })}
    </Slider>
  );
};

export default StudioEditsCarousel;
