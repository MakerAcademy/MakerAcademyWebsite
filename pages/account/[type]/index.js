import AccountSidebar from "@components/AccountSidebar";
import AccountForm from "@components/forms/AccountForm";
import ProfileForm from "@components/forms/ProfileForm";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const AccountPage = () => {
  const router = useRouter();
  const { type } = router.query;

  const NotFound = () => <Typography>Not Found</Typography>;

  const Form = FormRenderer[type] || NotFound;

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Stack direction="row" spacing={{ md: 6, lg: 10 }}>
        <Box sx={{ minWidth: 272 }}>
          <AccountSidebar />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Form />
        </Box>
      </Stack>
    </Container>
  );
};

const FormRenderer = {
  profile: ProfileForm,
  account: AccountForm,
};

export default AccountPage;
