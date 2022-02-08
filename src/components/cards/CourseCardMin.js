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
import React from "react";

const CourseCardMin = ({ title, tags, duration, level, timestamp }) => {
  const theme = useTheme();

  return (
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
            {tags.map((tag, i) => (
              <Chip
                label={
                  <Typography variant="body2" sx={{ fontWeight: 400 }}>
                    {tag}
                  </Typography>
                }
                key={i}
                sx={{
                  backgroundColor: theme.palette.background.black,
                  color: theme.palette.primary.white,
                }}
              />
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
            <Chip
              label={
                <Typography variant="body2" sx={{ fontWeight: 400 }}>
                  {level}
                </Typography>
              }
            />

            <Stack direction="row" alignItems="center" spacing={0.7}>
              <AccessTimeIcon sx={{ fontSize: 18 }} />
              <Typography>{duration} hrs</Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CourseCardMin;
