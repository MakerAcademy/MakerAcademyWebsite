import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { dummyMarkdown } from "@utils/markdown";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminPendingCard = (props) => {
  const { _id, title, thumbnail, author, description } = props;

  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const acceptEdit = async () => {
    handleDialogClose();
  };

  const rejectEdit = async () => {
    handleDialogClose();
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

          <Typography variant="body2">Author: {author}</Typography>

          {thumbnail && (
            <img
              src={thumbnail}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          )}

          {description && !thumbnail && (
            <Typography variant="body2">{description}</Typography>
          )}

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{ flex: 1 }}
          >
            <Tooltip title="Reject Edit">
              <IconButton color="error" onClick={rejectEdit}>
                <CancelIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Accept Edit">
              <IconButton color="success" onClick={acceptEdit}>
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
          <Paper elevation={3} sx={{ p: 2 }}>
            <ReactMarkdown>{dummyMarkdown}</ReactMarkdown>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminPendingCard;
