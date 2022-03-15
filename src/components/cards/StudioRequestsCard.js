import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StudioRequestsCard = (props) => {
  const { _id, document_title, title, image, body, description, publishedDoc } =
    props;

  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const acceptEdit = async () => {
    const res = await fetch("/api/documents?acceptSubmission=true", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        publishedId: publishedDoc?._id,
        draftId: _id,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) handleDialogClose();
      })
      .then(() => {
        window.location.reload();
      });
  };

  const rejectEdit = async () => {
    const res = await fetch("/api/documents?rejectSubmission=true", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        publishedId: publishedDoc?._id,
        draftId: _id,
      }),
    })
      .then((response) => {
        if (response.ok) handleDialogClose();
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          height: 300,
          width: 250,
          // backgroundColor: theme.palette.primary.main,
          p: 2,
          cursor: "pointer",
        }}
        onClick={() => setDialogOpen(true)}
      >
        <Stack spacing={2} sx={{ height: "100%" }}>
          <Typography variant="h6">{document_title}</Typography>

          <Typography variant="body2">{title}</Typography>

          {image && (
            <img
              src={image}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          )}

          {description && !image && (
            <Typography variant="body2">{description}</Typography>
          )}

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{ flex: 1 }}
          >
            <Tooltip title="Reject Edit">
              <IconButton color="error" size="small" onClick={rejectEdit}>
                <CancelIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Accept Edit">
              <IconButton color="success" size="small" onClick={acceptEdit}>
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Paper>

      <Dialog
        fullScreen
        open={!!dialogOpen}
        onClose={handleDialogClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              onClick={handleDialogClose}
              sx={{ color: theme.palette.primary.white }}
            >
              <CloseIcon />
            </IconButton>

            <Typography
              sx={{ ml: 2, flex: 1, color: theme.palette.primary.white }}
              variant="h6"
              component="div"
            >
              {title}
            </Typography>

            <Button
              onClick={rejectEdit}
              sx={{
                color: theme.palette.primary.white,
                textTransform: "inherit",
              }}
            >
              <CloseIcon fontSize="small" /> Reject
            </Button>
            <Button
              onClick={acceptEdit}
              sx={{
                color: theme.palette.primary.white,
                textTransform: "inherit",
              }}
            >
              <DoneIcon fontSize="small" />
              Approve
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <Grid container spacing={{ xs: 5 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <ReactMarkdown>{body || description}</ReactMarkdown>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <ReactMarkdown>
                  {publishedDoc?.body || publishedDoc?.description}
                </ReactMarkdown>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StudioRequestsCard;
