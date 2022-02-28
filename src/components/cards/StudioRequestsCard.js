import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { dummyMarkdown } from "@utils/markdown";

const StudioRequestsCard = ({ document_title, title, image, description }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
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
            <IconButton color="error" size="small">
              <CancelIcon />
            </IconButton>

            <IconButton color="success" size="small">
              <CheckCircleIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>

      <Dialog
        open={!!dialogOpen}
        onClose={handleDialogClose}
        BackdropProps={{ sx: { backgroundColor: "rgba(0,0,0,0.8)" } }}
      >
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          <ReactMarkdown>{dummyMarkdown}</ReactMarkdown>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="error">
            Reject
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudioRequestsCard;
