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
  brand,
  views = 0,
  likes,
  likes_count = 0,
}) => {
  const theme = useTheme();
  const tags = [topic, subtopic, level];

  const CustomChip = ({ text, Icon }) => (
    <Chip
      label={
        <Stack direction="row" alignItems="center" spacing={1}>
          {Icon && <Icon sx={{ fontSize: 18 }} />}
          <Typography variant="caption">{text}</Typography>
        </Stack>
      }
      sx={{
        backgroundColor: "rgba(0,0,0,0.75)",
        color: theme.palette.primary.white,
        mb: 0.5,
      }}
    />
  );

  return (
    <Link
      href={contentType === "documents" ? `/document/${_id}` : `/course/${_id}`}
      passHref
    >
      <Card
        elevation={3}
        sx={{ width: "100%", height: "100%", cursor: "pointer" }}
      >
        <Box sx={{ position: "relative" }}>
          <img
            src={thumbnail}
            alt={title}
            style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
          />

          {/* Tags */}
          {brand && (
            <Box sx={{ position: "absolute", top: 8, right: 8 }}>
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  py: 1,
                  px: 2,
                  backgroundColor: "#FFD700",
                  width: "100%",
                  borderRadius: 5,
                }}
              >
                <Typography variant="body2">{brand}</Typography>
              </Stack>
            </Box>
          )}

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
            <CustomChip text={likes?.length || 0} Icon={FavoriteIcon} />
          </Box>
        </Box>

        <CardContent sx={{ pb: "12px !important" }}>
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

          <Stack
            direction="row"
            alignItems="center"
            // sx={{ position: "absolute", top: 8, left: 8 }}
            sx={{ mt: 2 }}
            spacing={0.5}
            flexWrap="wrap"
          >
            {tags.map((tag, i) => (
              <CustomChip text={tag} key={i} />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ContentCard;
