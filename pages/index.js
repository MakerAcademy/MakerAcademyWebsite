import Section1 from "@components/landingSections/Section1";
import Section2 from "@components/landingSections/Section2";
import Section3 from "@components/landingSections/Section3";
import withAppConfig from "@hoc/withAppConfig";
import { Box } from "@mui/material";
// import useTranslation from "next-translate/useTranslation";
import React from "react";

const Home = ({ appConfig }) => {
  // const { t, lang } = useTranslation();


  return (
    <Box>
      <Section1 />
      <Section2 />
      <Section3 />
    </Box>
  );
};

export default withAppConfig(Home);
