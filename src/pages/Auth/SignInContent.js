import RoundedButton from "@components/buttons/RoundedButton";
import ResponsiveText from "@components/ResponsiveText";
import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

const SignInContent = ({}) => {
  const theme = useTheme();
  const [termsDialog, setTermsDialog] = useState(false);
  const [policyDialog, setPolicyDialog] = useState(false);

  const StyledDialogButton = styled("span")`
    text-decoration: underline;
    cursor: pointer;
  `;

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={4}
        sx={{
          height: "100%",
          color: theme.palette.primary.white,
        }}
      >
        <ResponsiveText variant="h2">Sign In</ResponsiveText>

        <ResponsiveText variant="h5">Good to see you again!</ResponsiveText>

        <ResponsiveText variant="h6" sx={{ fontWeight: 400, pb: 3 }}>
          By logging in for Maker Academy, you agree to our{" "}
          <StyledDialogButton onClick={() => setTermsDialog(true)}>
            Terms of Use
          </StyledDialogButton>{" "}
          and our{" "}
          <StyledDialogButton onClick={() => setPolicyDialog(true)}>
            Privacy Policy
          </StyledDialogButton>
          .
        </ResponsiveText>

        <RoundedButton
          variant="white"
          fullWidth
          sx={{ maxWidth: 250 }}
          href="/sign-up"
          shallow
        >
          Sign Up
        </RoundedButton>
      </Stack>

      {/* TODO - If long dialog contents, move to its own component */}
      {/* Terms Dialog */}
      <Dialog
        fullWidth
        maxWidth="md"
        onClose={() => setTermsDialog(false)}
        open={termsDialog}
      >
        <DialogTitle>Terms Dialog</DialogTitle>
        <DialogContent>Terms Dialog Content</DialogContent>
        <DialogActions>
          <Button onClick={() => setTermsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Policy Dialog */}
      <Dialog
        fullWidth
        maxWidth="md"
        onClose={() => setPolicyDialog(false)}
        open={policyDialog}
      >
        <DialogTitle>Policy Dialog</DialogTitle>
        <DialogContent>Policy Dialog Content</DialogContent>
        <DialogActions>
          <Button onClick={() => setPolicyDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignInContent;
