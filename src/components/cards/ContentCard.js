import {
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  Chip,
  Box,
  useTheme,
} from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ContentCard = ({
  thumbnail_url,
  title,
  description,
  topic,
  subtopic,
  duration,
  level,
  timestamp,
}) => {
  const theme = useTheme();
  const tags = [topic, subtopic];
  console.log(new Date());

  return (
    <Card elevation={3} sx={{ width: "100%", cursor: "pointer" }}>
      <Box sx={{ position: "relative" }}>
        <img
          src={thumbnail_url}
          alt={title}
          style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
        />

        {/* Tags */}
        <Stack
          direction="row"
          alignItems="center"
          sx={{ position: "absolute", top: 8, left: 8 }}
          spacing={0.5}
        >
          {tags.map((tag, i) => (
            <Chip
              label={tag}
              key={i}
              sx={{
                backgroundColor: theme.palette.background.black,
                color: theme.palette.primary.white,
              }}
            />
          ))}
        </Stack>
      </Box>

      <CardContent>
        <Typography variant="caption">Posted {new Date(timestamp).toDateString()}</Typography>

        <Typography variant="h6">{title}</Typography>

        <Divider sx={{ my: 1.5 }} />

        <Typography variant="body2" sx={{ mb: 3 }}>
          {description}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Chip label={level} />

          <Stack direction="row" alignItems="center" spacing={0.7}>
            <AccessTimeIcon sx={{ fontSize: 18 }} />
            <Typography>{duration} hrs</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ContentCard;
