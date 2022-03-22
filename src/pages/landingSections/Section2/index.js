import { CommonContext } from "@context/commonContext";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const contributors = [
  {
    title: "acquire_skills",
    buttonText: "contributor_overview",
    link: "/contribute",
  },
];

const learners = [
  {
    title: "new_to_maker",
    buttonText: "maker_overview",
    link: "/maker-overview",
  },
  {
    title: "in_depth_knowledge",
    buttonText: "expert_overview",
    link: "/expert-overview",
  },
];

const educators = [
  {
    title: "add_your_content",
    buttonText: "creator_studio",
    link: "/studio",
    showSignUpDialog: true,
  },
];

const Section2 = ({ user }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const router = useRouter();

  const { setCommonValues } = useContext(CommonContext);

  const { t } = useTranslation("home");

  const CustomCard = ({ title, buttonText, link, showSignUpDialog }) => (
    <Card elevation={0}>
      <Box sx={{ py: 3, p: 2.2 }}>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography sx={{ fontWeight: 500 }}>{t(title)}</Typography>

          <Button
            variant="outlined"
            size="small"
            sx={{
              borderWidth: "2px",
              fontWeight: 500,
              "&:hover": {
                borderWidth: "2px",
              },
            }}
            onClick={() =>
              showSignUpDialog && !user?.authenticated
                ? setCommonValues({ signUpDialogOpen: true })
                : router.push(link)
            }
          >
            {t(buttonText)}
          </Button>
        </Stack>
      </Box>
    </Card>
  );

  return (
    <Box
      sx={{
        backgroundColor: isDark ? grey[900] : grey[200],
        py: { xs: 4, md: 6, lg: 8 },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 3, md: 6, lg: 10 }}>
          <Grid item xs={12} md={6}>
            {/* Learners */}
            <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
              {t("for_learners")}
            </Typography>

            <Stack spacing={3}>
              {learners.map((item, i) => (
                <CustomCard {...item} key={i} />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Educators */}
            <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
              {t("for_educators")}
            </Typography>

            <Stack spacing={3} sx={{ mb: 3 }}>
              {educators.map((item, i) => (
                <CustomCard {...item} key={i} />
              ))}
            </Stack>

            {/* Contributors */}
            <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
              {t("for_contributors")}
            </Typography>

            <Stack spacing={3}>
              {contributors.map((item, i) => (
                <CustomCard {...item} key={i} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Section2;
