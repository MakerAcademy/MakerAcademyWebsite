import {
  Box,
  Stack,
  useTheme,
  Typography,
  Tooltip,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import React, { useState } from "react";
import { AuthorBgDark, AuthorBgLight } from "@utils/images";
import ResponsiveText from "@components/ResponsiveText";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RoundedButton from "@components/buttons/RoundedButton";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import TikTokIcon from "@mui/icons-material/Audiotrack";
import EmailIcon from "@mui/icons-material/Email";
import { grey } from "@mui/material/colors";
import LanguageIcon from "@mui/icons-material/Language";

const dummyTabs = ["all", "content", "programs"];

const AuthorBanner = ({
  image,
  firstName,
  lastName,
  bio,
  socials = {},
  profile_link,
  walletAddress,
  sx = {},
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const AddressBox = ({ address }) => (
    <Tooltip title="Copy to clipboard">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        sx={{
          borderRadius: "20px",
          py: 1,
          px: 2,
          backgroundColor: theme.palette.primary.white2,
          color: theme.palette.primary.grey,
          cursor: "pointer",
          "&:hover": {
            color: theme.palette.primary.purple,
          },
          [theme.breakpoints.up("sm")]: {
            maxWidth: 300,
          },
        }}
      >
        <Box
          sx={{
            width: "85%",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {address}
          </Typography>
        </Box>

        <FileCopyIcon fontSize="small" />
      </Stack>
    </Tooltip>
  );

  const SocialLink = ({ children }) => (
    <Button
      variant="outlined"
      sx={{
        width: 40,
        height: 40,
        minWidth: 0,
        borderRadius: "8px",
        backgroundColor: theme.palette.background.white,
        border: `1px solid ${theme.palette.background.white}`,
        color: theme.palette.primary.black,
        "&:hover": {
          backgroundColor: "transparent",
          border: `1px solid ${theme.palette.background.main}`,
          color: theme.palette.primary.white,
        },
      }}
    >
      {children}
    </Button>
  );

  return (
    <Box sx={{ ...sx }}>
      {/* Top */}
      <Box
        sx={{
          color: theme.palette.primary.white,
          background: `url(${isDark ? AuthorBgDark : AuthorBgLight})`,
          backgroundSize: "cover",
          p: 3,
          borderRadius: "12px 12px 0 0",
          backgroundColor: isDark ? grey[100] : grey[600],
          [theme.breakpoints.up("md")]: {
            p: 5,
            py: 6,
          },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={{ xs: 3, md: 5 }}
        >
          {/* Left Image */}
          <Stack
            alignItems="center"
            sx={{
              minWidth: 260,
              [theme.breakpoints.up("md")]: {
                position: "relative",
                "& > img": {
                  position: "absolute",
                },
              },
            }}
          >
            <img
              src={
                image ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt={`${firstName} ${lastName}`}
              style={{
                borderRadius: "20px",
                height: 260,
                width: 260,
              }}
            />
          </Stack>

          {/* Right Content */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            flexGrow={1}
            spacing={3}
          >
            <Stack sx={{ maxWidth: 700 }}>
              <Typography sx={{ fontSize: 18, fontWeight: 300 }}>
                User Profile
              </Typography>
              <ResponsiveText variant="h4" sx={{ fontWeight: 600, mb: 1.5 }}>
                {firstName} {lastName}
              </ResponsiveText>
              <Typography variant="body2" sx={{ mb: 3, fontWeight: 300 }}>
                {bio}
              </Typography>
              <AddressBox address={walletAddress || profile_link} />
            </Stack>

            {/* Social Links */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              alignItems={{ xs: "center", sm: "flex-start" }}
            >
              <Stack direction="row" spacing={1}>
                {socials.twitter && (
                  <SocialLink>
                    <TwitterIcon />
                  </SocialLink>
                )}

                {socials.telegram && (
                  <SocialLink>
                    <TelegramIcon />
                  </SocialLink>
                )}

                {socials.otherLink && (
                  <SocialLink>
                    <LanguageIcon />
                  </SocialLink>
                )}

                {socials.email && (
                  <SocialLink>
                    <EmailIcon />
                  </SocialLink>
                )}
              </Stack>

              {/* <RoundedButton variant="white" sx={{ height: 40, width: "100%" }}>
                Follow
              </RoundedButton> */}
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* Bottom */}
      <Box
        sx={{
          backgroundColor: isDark ? grey[800] : grey[200],
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          [theme.breakpoints.up("md")]: {
            pr: 4,
          },
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          sx={{
            ".Mui-selected": { color: theme.palette.primary.main },
            ".MuiTabs-indicator": {
              backgroundColor: theme.palette.primary.main,
            },
            "& .MuiTabs-flexContainer": {
              [theme.breakpoints.up("md")]: {
                justifyContent: "flex-end",
              },
            },
          }}
        >
          {dummyTabs.map((item, i) => (
            <Tab
              sx={{
                color: theme.palette.text.grey1,
                fontSize: 14,
                px: 2,
                py: 2.5,
                [theme.breakpoints.up("md")]: {
                  py: 3,
                  fontSize: 18,
                  px: 4,
                },
              }}
              label={item}
              key={i}
              value={i}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default AuthorBanner;
