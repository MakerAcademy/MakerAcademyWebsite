import RoundedButton from "@components/buttons/RoundedButton";
import FormTextField from "@components/formComponents/FormTextField";
import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const AccountForm = () => {
  const hookForm = useForm();
  const { handleSubmit, reset, control, getValues } = hookForm;

  const SectionTitle = ({ children }) => (
    <Typography sx={{ fontSize: 20, fontWeight: 500, mb: 2.5 }}>
      {children}
    </Typography>
  );

  const FieldLabel = ({ children }) => (
    <Typography sx={{ fontSize: 14, fontWeight: 300, mb: 1 }}>
      {children}
    </Typography>
  );

  const onSubmit = (data, e) => {
    reset(); // reset after form submit
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form */}
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12}>
          <Stack spacing={3}>
            <SectionTitle>Change email</SectionTitle>

            <Box>
              <FieldLabel>Old email</FieldLabel>
              <FormTextField
                name="old_email"
                control={control}
                placeholder="abc@xyz.com"
              />
            </Box>

            <Box>
              <FieldLabel>New email</FieldLabel>
              <FormTextField
                name="new_email"
                control={control}
                placeholder="abc@xyz.com"
              />
            </Box>

            <Stack alignItems="flex-end">
              <RoundedButton>Save Changes</RoundedButton>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={3}>
            <SectionTitle>Change username</SectionTitle>

            <Box>
              <FieldLabel>Old Username</FieldLabel>
              <FormTextField
                name="old_username"
                control={control}
                placeholder="Old Username"
              />
            </Box>

            <Box>
              <FieldLabel>New Username</FieldLabel>
              <FormTextField
                name="new_username"
                control={control}
                placeholder="New username"
              />
            </Box>

            <Stack alignItems="flex-end">
              <RoundedButton>Save Changes</RoundedButton>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={3}>
            <SectionTitle>Change password</SectionTitle>

            <Box>
              <FieldLabel>Old Password</FieldLabel>
              <FormTextField
                name="old_password"
                control={control}
                placeholder="Old password"
              />
            </Box>

            <Box>
              <FieldLabel>New Password</FieldLabel>
              <FormTextField
                name="new_password"
                control={control}
                placeholder="New password"
              />
            </Box>

            <Stack alignItems="flex-end">
              <RoundedButton>Save Changes</RoundedButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default AccountForm;
