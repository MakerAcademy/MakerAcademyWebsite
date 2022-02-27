import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import Link from "next/link";
import React from "react";

const ContentCard = ({
  _id,
  thumbnail_url,
  title,
  subtitle,
  description,
  author,
  topic,
  subtopic,
  duration,
  content_type,
  level,
  timestamp,
  verification,
  views = 0,
  likes = 0,
}) => {
  const theme = useTheme();
  const tags = [topic, subtopic, level];

  const CustomChip = ({ text, Icon }) => (
    <Chip
      label={
        <Stack direction="row" alignItems="center" spacing={1}>
          {Icon && <Icon sx={{ fontSize: 18 }} />}
          <Typography variant="body2">{text}</Typography>
        </Stack>
      }
      sx={{
        backgroundColor: "rgba(0,0,0,0.85)",
        color: theme.palette.primary.white,
      }}
    />
  );

  return (
    <Link
      href={content_type === "document" ? `/document/${_id}` : `/course/${_id}`}
      passHref
    >
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
              <CustomChip text={tag} key={i} />
            ))}
          </Stack>

          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              left: 8,
            }}
          >
            <CustomChip text={views} Icon={VisibilityIcon} />
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
            }}
          >
            <CustomChip text={likes} Icon={FavoriteIcon} />
          </Box>
        </Box>

        <CardContent>
          <Typography variant="caption">
            Posted {moment(timestamp).format("LL")}
          </Typography>

          {author && <Typography variant="body2">By {author}</Typography>}

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
            <Chip label={content_type} />

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
