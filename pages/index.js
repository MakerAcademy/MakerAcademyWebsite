import withAppConfig from "@hoc/withAppConfig";
import { Box } from "@mui/material";
import Section1 from "@pages/landingSections/Section1";
import Section2 from "@pages/landingSections/Section2";
import Section3 from "@pages/landingSections/Section3";
import { useSession } from "next-auth/react";
// import useTranslation from "next-translate/useTranslation";
import React from "react";

const Home = ({ appConfig }) => {
  // const { t, lang } = useTranslation();
  // console.log(nanoid(21));
  const { data: session, status } = useSession();

  return (
    <Box>
      <Section1 />
      <Section2 />
      <Section3 />
    </Box>
  );
};

export default withAppConfig(Home);
