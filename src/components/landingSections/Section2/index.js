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
import React from "react";

const learners = [
  { title: "New to Maker?", buttonText: "Maker Overview" },
  {
    title: "Wish to acquire the skills to contribute to Maker?",
    buttonText: "Contributor Pathways",
  },
  {
    title: "Want in-depth knowledge of an aspect of Maker?",
    buttonText: "Expert Overview",
  },
];

const educators = [
  { title: "Want to add your own content?", buttonText: "Creator Studio" },
];

const Section2 = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const CustomCard = ({ title, buttonText }) => (
    <Card elevation={0}>
      <Box sx={{ py: 3, p: 2.2 }}>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography sx={{ fontWeight: 500 }}>{title}</Typography>
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
            {buttonText}
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
            <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
              For Learners
            </Typography>

            <Stack spacing={3}>
              {learners.map((item, i) => (
                <CustomCard {...item} key={i} />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
              For Educators
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
