import Section1 from "@pages/landingSections/Section1";
import Section2 from "@pages/landingSections/Section2";
import Section3 from "@pages/landingSections/Section3";
import withAppConfig from "@hoc/withAppConfig";
import { Box, Button } from "@mui/material";
// import useTranslation from "next-translate/useTranslation";
import React from "react";
import { nanoid } from "nanoid";
import { signIn, useSession } from "next-auth/react";

const Home = ({ appConfig }) => {
  // const { t, lang } = useTranslation();
  // console.log(nanoid(21));
  const {data: session, status} = useSession();

  return (
    <Box>
      <h1>{status}</h1>
      <Button onClick={() => signIn("google")}>Sign In Test</Button>
      <Section1 />
      <Section2 />
      <Section3 />
    </Box>
  );
};

export default withAppConfig(Home);
