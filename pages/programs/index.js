import BreadcrumbsSection from "@components/BreadcrumbsSection";
import RoundedButton from "@components/buttons/RoundedButton";
import ProgramsCoursesCarousel from "@components/carousels/ProgramsCoursesCarousel";
import ResponsiveText from "@components/ResponsiveText";
import SearchFilterBar from "@components/SearchFilterBar";
import { CONTENT_SORT_ITEMS } from "@constants/";
import { TAGS } from "@constants/tags";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { connectToDB } from "../../lib/db/connect";
import {
  getCountEstimate,
  getPrograms,
  getProgramSearchTags,
} from "../../lib/db/program";

const ProgramsPage = ({ programs, tags, count, likes = 0, views = 0 }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { t } = useTranslation("programs");

  const ProgramContainer = ({ _id, title, subtitle, children }) => (
    <Paper
      elevation={isDark ? 2 : 0}
      sx={{
        p: 3,
        borderRadius: "10px",
        boxShadow:
          !isDark &&
          "rgba(0, 0, 0, 0.16) 0px 6px 16px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Box sx={{ maxWidth: 700 }}>
          <ResponsiveText variant="h5" sx={{ mb: 1.5 }}>
            {title}
          </ResponsiveText>
          <Typography>{subtitle}</Typography>
        </Box>

        <RoundedButton
          variant="outlined"
          sx={{ height: 40, px: 2, minWidth: 115 }}
          href={`/programs/${_id}`}
        >
          {t("view_more")}
        </RoundedButton>
      </Stack>

      {/* Body */}
      <Box sx={{ py: 2 }}>{children}</Box>

      {/* Likes and Views */}
      <Stack spacing={2} direction="row" justifyContent="flex-end">
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <VisibilityIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2">
            {t("views")}: {views}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <FavoriteIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2">
            {t("likes")}: {likes}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Stack justifyContent="center" alignItems="center" spacing={3}>
        {/* Breadcrumbs */}
        <BreadcrumbsSection
          title={t("programs")}
          subtitle={t("programs_caption")}
          sx={{ mb: 3 }}
        />

        {/* Search */}
        <SearchFilterBar
          tags={tags}
          withSort
          sortItems={CONTENT_SORT_ITEMS}
          translateCategories
          dontTranslateSubCategoriesOf={["author_id"]}
          inputPlaceholder={t("search_bar")}
        />

        {/* Content */}
        <Stack sx={{ width: "100%", py: 2 }} spacing={{ xs: 2, md: 4 }}>
          {programs.map((program, i) => (
            <Box key={i}>
              <ProgramContainer
                _id={program._id}
                title={program.title}
                subtitle={program.subtitle}
              >
                <ProgramsCoursesCarousel
                  courses={program.courses}
                  _programId={program._id}
                />
              </ProgramContainer>
            </Box>
          ))}
        </Stack>

        {/* Load more */}
        {count > programs.length && <RoundedButton>Load More</RoundedButton>}
      </Stack>
    </Container>
  );
};

export async function getServerSideProps(context) {
  // Add fetch to utils or api once backend complete
  const { db } = await connectToDB();
  const programs = await getPrograms(db, {}, null);
  const tags = await getProgramSearchTags(db, TAGS);
  const count = await getCountEstimate(db, "programs");

  return {
    props: {
      programs: programs,
      tags: tags,
      count: count,
    },
  };
}

export default ProgramsPage;
