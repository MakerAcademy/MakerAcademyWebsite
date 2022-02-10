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
import Link from "next/link";

const ContentCard = ({
  _id,
  image,
  title,
  subtitle,
  tags,
  duration,
  content_type,
  timestamp,
}) => {
  const theme = useTheme();

  const CustomChip = ({ text }) => (
    <Chip
      label={text}
      sx={{
        backgroundColor: theme.palette.background.black,
        color: theme.palette.primary.white,
      }}
    />
  );

  return (
    <Link href={`/content/${_id}`}>
      <Card elevation={3} sx={{ width: "100%", cursor: "pointer" }}>
        <Box sx={{ position: "relative" }}>
          <img
            src={image}
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
            <CustomChip text={content_type} />

            {tags.map((tag, i) => (
              <CustomChip text={tag} key={i} />
            ))}
          </Stack>
        </Box>

        <CardContent>
          <Typography variant="caption">Posted {timestamp}</Typography>

          <Typography variant="h6">{title}</Typography>

          <Divider sx={{ my: 1.5 }} />

          <Typography variant="body2" sx={{ mb: 3 }}>
            {subtitle}
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Stack direction="row" alignItems="center" spacing={0.7}>
              <AccessTimeIcon sx={{ fontSize: 18 }} />
              <Typography>{duration} hrs</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ContentCard;
