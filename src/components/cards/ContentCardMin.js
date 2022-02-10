import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import React from "react";

const ContentCardMin = ({
  _programId,
  _id,
  title,
  tags,
  duration,
  level,
  timestamp,
  content_type,
}) => {
  const theme = useTheme();

  const CustomChip = ({ text }) => (
    <Chip
      label={
        <Typography sx={{ fontSize: 13, fontWeight: 400 }}>{text}</Typography>
      }
      sx={{
        backgroundColor: theme.palette.background.black,
        color: theme.palette.primary.white,
      }}
    />
  );

  return (
    // TODO - Use util function to build the url depending on the route
    <Link href={`/programs/${_programId}/course/${_id}`}>
      <Card
        elevation={3}
        sx={{
          width: "100%",
          cursor: "pointer",
          maxWidth: 300,
          borderRadius: "20px",
        }}
      >
        <CardContent>
          <Stack spacing={1.5}>
            {/* Tags */}
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <CustomChip text={level} />
              {tags.map((tag, i) => (
                <CustomChip text={tag} key={i} />
              ))}
            </Stack>

            <Typography variant="caption">Posted {timestamp}</Typography>

            <Typography variant="h6">{title}</Typography>

            <Divider />

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
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ContentCardMin;
