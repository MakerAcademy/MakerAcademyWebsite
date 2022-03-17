import RoundedButton from "@components/buttons/RoundedButton";
import ResponsiveText from "@components/ResponsiveText";
import {
  Box,
  Container,
  Dialog,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { HomeBg } from "@utils/images";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReactPlayer from "react-player/lazy";
import CloseIcon from "@mui/icons-material/Close";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const Section1 = () => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { t } = useTranslation("home");

  return (
    <Box>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          p: 3,
          pt: 8,
          [theme.breakpoints.up("md")]: {
            minHeight: "50vh",
            backgroundImage: `url(${HomeBg})`,
            // backgroundPosition: "center center",
            backgroundSize: "cover",
          },
          [theme.breakpoints.up("lg")]: {
            minHeight: "60vh",
          },
        }}
      >
        <Container maxWidth="xl" sx={{ py: 5 }}>
          <Stack alignItems="center" justifyContent="center">
            <ResponsiveText variant="h2" sx={{ mb: 1 }}>
              {t("maker_academy")}
            </ResponsiveText>

            <ResponsiveText variant="h4" sx={{ mb: 2 }}>
              {t("learn")}. {t("contribute")}. {t("innovate")}.
            </ResponsiveText>

            <Typography variant="h6" sx={{ mb: 3 }}>
              {t("source_for_education")}
            </Typography>

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems="center"
            >
              <RoundedButton
                sx={{ px: 4, py: 1.5 }}
                icon={<HowToRegIcon fontSize="small" />}
                href="/sign-up?show=true"
              >
                Sign Up
              </RoundedButton>

              <RoundedButton
                sx={{ px: 4, py: 1.5 }}
                icon={<PlayArrowIcon fontSize="small" />}
                onClick={() => setDialogOpen(true)}
                variant="outlined"
              >
                {t("play_video")}
              </RoundedButton>
            </Stack>
          </Stack>
        </Container>
      </Stack>
      <Divider />

      <Dialog
        fullWidth
        // maxWidth="md"
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        PaperProps={{
          sx: { backgroundColor: "transparent", boxShadow: "unset" },
        }}
        BackdropProps={{ sx: { backgroundColor: "rgba(0,0,0,0.8)" } }}
      >
        <Stack alignItems={"flex-end"}>
          <CloseIcon
            fontSize="large"
            sx={{
              color: theme.palette.primary.white,
              cursor: "pointer",
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
            onClick={() => setDialogOpen(false)}
          />
        </Stack>
        <ReactPlayer
          url="https://player.vimeo.com/video/411464106?portrait=0&byline=0&autoplay=1&controls=0"
          controls={true}
          width="100%"
          playing
        />
      </Dialog>
    </Box>
  );
};

export default Section1;
