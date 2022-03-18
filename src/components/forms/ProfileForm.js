import RoundedButton from "@components/buttons/RoundedButton";
import PreviewProfileCard from "@components/cards/PreviewProfileCard";
import FormDropzone from "@components/FormComponents/FormDropzone";
import FormTextField from "@components/FormComponents/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";

const ProfileForm = ({ values, handleSubmit: propsHandleSubmit }) => {
  const theme = useTheme();

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: values,
  };

  const hookForm = useForm(formOptions);
  const { handleSubmit, reset, control, getValues } = hookForm;

  const _image = useWatch({ control, name: "image" });

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
    // reset(); // reset after form submit
    propsHandleSubmit({ ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>
        {/* Form */}
        <Grid item xs={12} lg={8} xl={9}>
          {/* Upload File */}
          {/* <Box>
            <SectionTitle>Upload a Profile Picture</SectionTitle>
            <FormDropzone name="image" control={control} exists={!!_image}>
              <Stack
                spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  width: "100%",
                  [theme.breakpoints.up("md")]: { px: 6 },
                }}
              >
                <Typography>Only types PNG or JPG under 5mb</Typography>
                <RoundedButton variant="outlined">Upload file</RoundedButton>
              </Stack>
            </FormDropzone>
          </Box> */}

          {/* Form */}
          <Grid
            container
            spacing={{ xs: 2, md: 4, lg: 6 }}
            sx={{ pt: { xs: 3, lg: 4 } }}
          >
            {/* Account Left side */}
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <SectionTitle disableMargin>Account Info</SectionTitle>

                <Box>
                  <FieldLabel>First Name</FieldLabel>
                  <FormTextField
                    name="firstName"
                    control={control}
                    placeholder="Colby"
                  />
                </Box>

                <Box>
                  <FieldLabel>Last Name</FieldLabel>
                  <FormTextField
                    name="lastName"
                    control={control}
                    placeholder="Anderson"
                  />
                </Box>

                <Box>
                  <FieldLabel>Title</FieldLabel>
                  <FormTextField
                    name="title"
                    control={control}
                    placeholder="Educator"
                  />
                </Box>

                <Box>
                  <FieldLabel>Wallet Address</FieldLabel>
                  <FormTextField
                    name="walletAddress"
                    control={control}
                    placeholder="0x012df34dd554rg6e78905t"
                  />
                </Box>

                <Box>
                  <FieldLabel>Bio</FieldLabel>
                  <FormTextField
                    name="bio"
                    control={control}
                    multiline
                    rows={3}
                  />
                </Box>
              </Stack>
            </Grid>

            {/* Socials Right side */}
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <SectionTitle disableMargin>Your Social Media</SectionTitle>

                <Box>
                  <FieldLabel>Email</FieldLabel>
                  <FormTextField
                    name="socials.email"
                    control={control}
                    placeholder="abc@gmail.com"
                  />
                </Box>

                <Box>
                  <FieldLabel>Facebook</FieldLabel>
                  <FormTextField
                    name="socials.facebook"
                    control={control}
                    placeholder="@colby_anderson"
                  />
                </Box>

                <Box>
                  <FieldLabel>Twitter</FieldLabel>
                  <FormTextField
                    name="socials.twitter"
                    control={control}
                    placeholder="@colby_anderson"
                  />
                </Box>

                <Box>
                  <FieldLabel>Telegram</FieldLabel>
                  <FormTextField
                    name="socials.telegram"
                    control={control}
                    placeholder="Discord Link"
                  />
                </Box>

                <Box>
                  <FieldLabel>Other</FieldLabel>
                  <FormTextField
                    name="socials.otherLink"
                    control={control}
                    placeholder="Any other link you have"
                  />
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack alignItems="flex-end" spacing={2}>
                <RoundedButton
                  variant="navbar"
                  type="submit"
                  sx={{
                    minWidth: 200,
                  }}
                >
                  Update Profile
                </RoundedButton>
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        {/* Profile Card */}
        <Grid item xs={12} lg={4} xl={3}>
          <Stack alignItems="center">
            <PreviewProfileCard control={control} />
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileForm;
