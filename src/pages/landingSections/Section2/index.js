import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";

const learners = [
  {
    title: "new_to_maker",
    buttonText: "maker_overview",
    link: "/maker-overview",
  },
  {
    title: "acquire_skills",
    buttonText: "contributor_overview",
    link: "/contributor-pathways",
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
  },
];

const Section2 = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { t } = useTranslation("home");

  const CustomCard = ({ title, buttonText, link }) => (
    <Link href={link}>
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
            >
              {t(buttonText)}
            </Button>
          </Stack>
        </Box>
      </Card>
    </Link>
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
            <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
              {t("for_educators")}
            </Typography>

            <Stack spacing={3}>
              {educators.map((item, i) => (
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
