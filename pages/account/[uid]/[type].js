import AccountSidebar from "@components/sidebars/AccountSidebar";
import { withProtectedUser } from "@hoc/routes";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PersonOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const sidebarItems = (trustLevel) => {
  return [
    {
      name: "Profile",
      value: "profile",
      icon: PersonOutlinedIcon,
      href: "/account/{uid}/profile",
    },
    {
      name: "Account",
      value: "auth",
      icon: SettingsOutlinedIcon,
      href: "/account/{uid}/auth",
    },
    {
      name: "Admin",
      value: "admin",
      icon: AdminPanelSettingsOutlinedIcon,
      href: "/account/{uid}/admin",
      hidden: trustLevel < 3,
    },
    { type: "divider" },
    {
      name: "Creator Studio",
      icon: MovieOutlinedIcon,
      rightIcon: OpenInNewIcon,
      href: "/studio",
      differentPage: true,
    },
  ];
};

const PageRenderer = ({ type, ...other }) => {
  const page = {
    "": dynamic(() => import("@pages/Account/Profile")),
    profile: dynamic(() => import("@pages/Account/Profile")),
    auth: dynamic(() => import("@pages/Account/Auth")),
    admin: dynamic(() => import("@pages/Account/Admin")),
  };

  const RenderedPage = page[type];

  if (!RenderedPage) return <Typography>Page Not Found</Typography>;

  return <RenderedPage {...other} />;
};

const AccountPage = ({ user }) => {
  const router = useRouter();
  const type = router.query.type;

  const [page, setPage] = useState(router.asPath);

  useEffect(() => {
    router.push(page, undefined, { shallow: true });
  }, [page]);

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Stack direction="row" spacing={{ md: 6, lg: 10 }}>
        <Box>
          <AccountSidebar
            setPage={setPage}
            sidebarItems={sidebarItems(user.trustLevel)}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <PageRenderer type={type} user={user} />
        </Box>
      </Stack>
    </Container>
  );
};

export default AccountPage;

export const getServerSideProps = withProtectedUser(async (context, user) => {
  const uid = context.params.uid;
  const type = context.params.type;

  if (
    (user.trustLevel < 3 && user._id !== uid) ||
    (user.trustLevel < 3 && type === "admin")
  ) {
    return { redirect: { destination: `/account/${user._id}/profile` } };
  }

  return { props: {} };
});
