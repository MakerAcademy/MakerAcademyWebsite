import { Paper, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useWatch } from "react-hook-form";

const watchFields = [
  { name: "firstName", defaultValue: "Colby" },
  { name: "lastName", defaultValue: "Anderson" },
  { name: "title", defaultValue: "Educator" },
  {
    name: "bio",
    defaultValue:
      "Lorem ipsum dolor sit amet,consectetur adipisicing elit. Quis non, fugit totam vel laboriosam vitae.",
  },
  { name: "email", defaultValue: "public@email.com" },
  {
    name: "image",
    defaultValue:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
];

const PreviewProfileCard = ({ control }) => {
  const theme = useTheme();

  const fields = watchFields.reduce((acc, item) => {
    acc[item.name] =
      useWatch({ control, name: item.name }) || item.defaultValue;

    return acc;
  }, {});

  const image =
    typeof fields.image === "object"
      ? URL.createObjectURL(fields.image)
      : fields.image;

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
          {fields.firstName} {fields.lastName}
        </Typography>

        <Typography sx={{ fontWeight: 500 }}>{fields.title}</Typography>

        <Typography variant="body2">{fields.email}</Typography>

        <Typography variant="body2">{fields.bio}</Typography>
      </Stack>
    </Paper>
  );
};

export default PreviewProfileCard;
