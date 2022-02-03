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

  const CustomCard = ({ title, buttonText }) => (
    <Card elevation={1}>
      <CardContent>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>{title}</Typography>
          <Button variant="outlined">{buttonText}</Button>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.sectionGrey,
        py: { xs: 4, md: 6, lg: 8 },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 3, md: 6, lg: 10 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              For Learners
            </Typography>

            <Stack spacing={2}>
              {learners.map((item, i) => (
                <CustomCard {...item} key={i} />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              For Educators
            </Typography>

            <Stack spacing={2}>
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
