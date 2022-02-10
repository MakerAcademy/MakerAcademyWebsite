import BreadcrumbsSection from "@components/BreadcrumbsSection";
import RoundedButton from "@components/buttons/RoundedButton";
import ResponsiveText from "@components/ResponsiveText";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import {
  Box,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const DUMMY_CONTENT = {
  _id: "231435345",
  title: "Facilitator Onboarding Program",
  description:
    "This will teach you what a DAO is and why Maker protocol is governed by a DAO instead of a corporation.",
  tags: ["abc", "xyz"],
  timestamp: "Jan 27 2020",
  content_type: "beginner",
  duration: 8,
  documents: [
    ...Array(12)
      .fill()
      .map((_, i) => ({
        _id: i,
        image:
          "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
        title: "Lorem Ipsum is simply dummy text",
        description:
          "This will teach you what a DAO is and why Maker protocol is governed by a DAO instead of a corporation.",
        author: "Colby Anderson",
        timestamp: "Jan 27 2020",
        duration: 90,
      })),
  ],
};

const Content = () => {
  const [content, setContent] = useState(DUMMY_CONTENT);

  const { query } = useRouter();
  const contentId = query.contentId;

  const breadcrumbs = [
    { label: "Content", href: "/content" },
    { label: "Onboarding", href: "/content" },
    { label: content.title, active: true },
  ];

  const DocumentCard = ({
    _id,
    image,
    title,
    author,
    description,
    duration,
  }) => (
    <Link href={`/content/${contentId}/document/${_id}`}>
      <Card elevation={3} sx={{ cursor: "pointer" }}>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <img
                src={image}
                alt={title}
                style={{
                  maxHeight: 200,
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={8} md={9} lg={10}>
              <Stack spacing={2}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {title}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Brightness1Icon sx={{ fontSize: 18 }} />
                  <Typography>{author}</Typography>
                </Stack>

                <Typography>{description}</Typography>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={0.7}
                >
                  <AccessTimeIcon sx={{ fontSize: 18 }} />
                  <Typography>{duration} mins</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Link>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <BreadcrumbsSection breadcrumbs={breadcrumbs} align="flex-start" />

      <Paper sx={{ p: 4, pb: { md: 6 }, mt: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ pb: 4 }}
        >
          <ResponsiveText variant="h5">{content.title}</ResponsiveText>

          <RoundedButton variant="outlined" sx={{ height: 40 }}>
            Begin
          </RoundedButton>
        </Stack>

        <Stack sx={{ pb: { xs: 3, md: 5 } }} spacing={3}>
          {content.documents.map((doc, i) => (
            <DocumentCard key={i} {...doc} />
          ))}
        </Stack>
      </Paper>
    </Container>
  );
};

export default Content;
