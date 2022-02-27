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
import moment from "moment";

const ContentCard = ({
  _id,
  thumbnail,
  title,
  subtitle,
  description,
  username,
  topic,
  subtopic,
  duration,
  contentType,
  level,
  timestamp,
  published,
  verification,
  views,
  likes,
}) => {
  const theme = useTheme();
  const tags = [topic, subtopic, level];

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
    <Link
      href={
        contentType === "documents"
          ? `/document/${published}`
          : `/course/${published}`
      }
      passHref
    >
      <Card elevation={3} sx={{ width: "100%", cursor: "pointer" }}>
        <Box sx={{ position: "relative" }}>
          <img
            src={thumbnail}
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
              <CustomChip text={tag} key={i} />
            ))}
          </Stack>
        </Box>

        <CardContent>
          <Typography variant="caption">
            Posted {moment(timestamp).format("LL")}
          </Typography>

          {username && <Typography variant="body2">By {username}</Typography>}

          <Typography variant="h6" sx={{ mt: 1 }}>
            {title}
          </Typography>

          <Divider sx={{ my: 1.5 }} />

          {subtitle && (
            <Typography variant="body2" sx={{ mb: 3 }}>
              {subtitle}
            </Typography>
          )}

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Chip label={contentType} />

            <Stack direction="row" alignItems="center" spacing={0.7}>
              <AccessTimeIcon sx={{ fontSize: 18 }} />
              <Typography>{duration} min</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ContentCard;
