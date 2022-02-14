import Section1 from "@components/landingSections/Section1";
import Section2 from "@components/landingSections/Section2";
import Section3 from "@components/landingSections/Section3";
import withAppConfig from "@hoc/withAppConfig";
import { Box } from "@mui/material";
// import useTranslation from "next-translate/useTranslation";
import React from "react";
import { nanoid } from "nanoid";

const Home = ({ appConfig }) => {
  // const { t, lang } = useTranslation();
  console.log(nanoid(21));

  return (
    <Box>
      <Section1 />
      <Section2 />
      <Section3 />
    </Box>
  );
};

export default withAppConfig(Home);
