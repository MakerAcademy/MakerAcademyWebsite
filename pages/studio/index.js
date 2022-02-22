import RoundedButton from "@components/buttons/RoundedButton";
import CreatorCounter from "@components/cards/CreatorCounter";
import SideNavBarLayout from "@layouts/SideNavBarLayout";
import AddIcon from "@mui/icons-material/Add";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import CommentIcon from "@mui/icons-material/Comment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import SettingsIcon from "@mui/icons-material/Settings";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import {
  Avatar,
  Box, Container,
  Grid,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { columns, rows } from "@pages/AboutUs/dummyData";
import { getSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const SIDEBAR_ITEMS = [
  {
    name: "creator_studio_dashboard",
    link: "/studio",
    shallow: true,
    icon: DashboardIcon,
  },
  {
    name: "creator_studio_content",
    link: "/studio/content",
    shallow: true,
    icon: VideoLibraryIcon,
  },
  {
    name: "creator_studio_playlists",
    link: "/studio/playlists",
    shallow: true,
    icon: PlaylistPlayIcon,
  },
  {
    name: "creator_studio_analytics",
    link: "/studio/analytics",
    shallow: true,
    icon: AnalyticsIcon,
  },
  {
    name: "creator_studio_comments",
    link: "/studio/comments",
    shallow: true,
    icon: CommentIcon,
  },
  {
    name: "creator_studio_subtitles",
    link: "/studio/subtitles",
    shallow: true,
    icon: SubtitlesIcon,
  },
  {
    type: "divider",
  },
  {
    name: "creator_studio_settings",
    link: "/studio/settings",
    shallow: true,
    icon: SettingsIcon,
  },
];

const CreatorStudio = ({ session }) => {
  const [pageSize, setPageSize] = useState(5);
  const { user } = session;

  const SidebarHeader = () => (
    <Stack
      justifyContent="center"
      sx={{ height: "100%", width: "100%", borderRadius: "10px" }}
    >
      <Stack spacing={2} direction="row" alignItems="center">
        <Avatar />

        <Box>
          <Typography sx={{ fontWeight: 500 }}>{user.name}</Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 300 }}>
            Educator
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );

  return (
    <SideNavBarLayout
      name="creatorSideNavBarDrawerOpen"
      SidebarHeader={SidebarHeader}
      sidebarItems={SIDEBAR_ITEMS}
      intlFile="creator-studio"
    >
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Stack spacing={{ xs: 3, md: 5, lg: 7 }} sx={{ width: "100%" }}>
          {/* Stats */}
          <Box>
            <Grid container spacing={{ xs: 3, md: 5 }}>
              <Grid item xs={12} sm={6} lg={3}>
                <CreatorCounter count={74} text="TOTAL COURSES" />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <CreatorCounter count={977} text="TOTAL FOLLOWERS" />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <CreatorCounter count={59} text="DOWNLOADS" />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Stack
                  sx={{ height: "100%" }}
                  alignItems="flex-end"
                  justifyContent="center"
                >
                  <Link href="/studio/new">
                    <RoundedButton
                      variant="outlined"
                      icon={<AddIcon fontSize="small" />}
                    >
                      Add new Content
                    </RoundedButton>
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          {/* Middle */}
          <Box>
            <Grid container spacing={{ xs: 3, md: 5 }}>
              <Grid item xs={12} md={5} lg={4}>
                <Paper sx={{ height: 300, width: "100%", p: 3 }}>
                  Left Card
                </Paper>
              </Grid>
              <Grid item xs={12} md={7} lg={8}>
                <Paper sx={{ height: 300, width: "100%", p: 3 }}>
                  Right Card
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* Table */}
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(i) => setPageSize(i)}
              rowsPerPageOptions={[5, 10, 20, 50]}
              checkboxSelection
              // onSelectionModelChange={handleselectedIds}
            />
          </Box>
        </Stack>
      </Container>
    </SideNavBarLayout>
  );
};

export default CreatorStudio;

export async function getServerSideProps(context) {
  const { req } = context;
  const data = await getSession({ req });
  console.log(data);
  if (data) {
    return {
      props: {
        session: data,
      },
    };
  } else {
    return {
      redirect: { destination: "/sign-in" },
    };
  }
}
