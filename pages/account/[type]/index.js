import AccountSidebar from "@components/sidebars/AccountSidebar";
import AccountForm from "@components/forms/AccountForm";
import ProfileForm from "@components/forms/ProfileForm";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PageRenderer = ({ type, ...other }) => {
  const page = {
    "/account": dynamic(() => import("@pages/Account/Profile")),
    "/account/profile": dynamic(() => import("@pages/Account/Profile")),
    "/account/auth": dynamic(() => import("@pages/Account/Auth")),
  };

  const RenderedPage = page[type];

  return <RenderedPage {...other} />;
};

const AccountPage = () => {
  const router = useRouter();

  const [page, setPage] = useState(router.asPath);

  useEffect(() => {
    router.push(page, undefined, { shallow: true });
  }, [page]);

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Stack direction="row" spacing={{ md: 6, lg: 10 }}>
        <Box>
          <AccountSidebar setPage={setPage} />
        </Box>

        <Box sx={{ flex: 1 }}>
          <PageRenderer type={page} />
        </Box>
      </Stack>
    </Container>
  );
};

const FormRenderer = {
  profile: ProfileForm,
  auth: AccountForm,
};

export default AccountPage;
