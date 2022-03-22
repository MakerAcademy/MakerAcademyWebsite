import { Paper, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useWatch } from "react-hook-form";

const PreviewProfileCard = ({ control }) => {
  const theme = useTheme();

  const firstName = useWatch({ control, name: "firstName" });
  const lastName = useWatch({ control, name: "lastName" });
  const bio = useWatch({ control, name: "bio" });
  const title = useWatch({ control, name: "title" });
  const email = useWatch({ control, name: "email" });
  const _image = useWatch({
    control,
    name: "email",
    defaultValue:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  });

  const image =
    typeof _image === "object" ? URL.createObjectURL(_image) : _image;

  return (
    <Paper sx={{ p: 2.5, borderRadius: "20px", maxWidth: 300 }}>
      <Stack spacing={2}>
        <img
          src={image}
          alt=""
          style={{
            maxHeight: 270,
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: 20,
            marginBottom: 5,
          }}
        />

        <Typography variant="h6">
          {firstName} {lastName}
        </Typography>

        <Typography sx={{ fontWeight: 500 }}>{title}</Typography>

        <Typography variant="body2">{email}</Typography>

        <Typography variant="body2">{bio}</Typography>
      </Stack>
    </Paper>
  );
};

export default PreviewProfileCard;
