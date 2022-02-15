import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";
import { grey } from "@mui/material/colors";

const TeamCard = ({
  image,
  name,
  title,
  description,
  linkedIn,
  twitter,
  website,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Card
      elevation={0}
      sx={{
        maxWidth: 345,
        border: `1px solid ${isDark ? grey[800] : grey[300]}`,
        "&:hover": {
          boxShadow: isDark
            ? "rgba(255, 255, 255, 0.16) 0px 5px 16px 0px, rgba(255, 255, 255, 0.06) 0px 0px 0px 1px"
            : "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
        },
      }}
    >
      <CardMedia component="img" height={190} image={image} alt={name} />
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {name}
          </Typography>

          <Typography variant="body2">{title}</Typography>

          <Typography variant="body2" sx={{ fontWeight: 300 }}>
            {description}
          </Typography>

          <Stack spacing={1} direction="row">
            <Link>
              <IconButton size="small">
                <LinkedInIcon fontSize="small" sx={{ color: "#0072B1" }} />
              </IconButton>
            </Link>

            <Link>
              <IconButton size="small">
                <TwitterIcon fontSize="small" sx={{ color: "#1DA1F2" }} />
              </IconButton>
            </Link>

            <Link>
              <IconButton size="small">
                <LanguageIcon
                  fontSize="small"
                  sx={{ color: theme.palette.primary.inverse }}
                />
              </IconButton>
            </Link>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
