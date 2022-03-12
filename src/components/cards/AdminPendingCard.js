import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminPendingCard = (props) => {
  const { _id, title, thumbnail, username, description, body } = props;

  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const acceptDoc = async () => {
    const res = await fetch(
      `/api/documents?acceptPendingDoc=true&&_id=${_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({}),
      }
    )
      .then((response) => {
        if (response.ok) handleDialogClose();
      })
      .then(() => {
        window.location.reload();
      });
  };

  const rejectDoc = async () => {
    const res = await fetch(
      `/api/documents?rejectPendingDoc=true&&_id=${_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({}),
      }
    )
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
          height: 400,
          width: "100%",
          // backgroundColor: theme.palette.primary.main,
          p: 2,
          cursor: "pointer",
        }}
        onClick={() => setDialogOpen(true)}
      >
        <Stack spacing={2} sx={{ height: "100%" }}>
          <Typography variant="h6">{title}</Typography>

          <Typography variant="body2">Author: @{username}</Typography>

          {thumbnail && (
            <img
              src={thumbnail}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          )}

          {description && !thumbnail && (
            <Typography variant="body2">{description}</Typography>
          )}
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
              onClick={rejectDoc}
              sx={{
                color: theme.palette.primary.white,
                textTransform: "inherit",
              }}
            >
              <CloseIcon fontSize="small" /> Reject
            </Button>
            <Button
              onClick={acceptDoc}
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
          <Paper elevation={3} sx={{ p: 2 }}>
            <ReactMarkdown>{body}</ReactMarkdown>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminPendingCard;
