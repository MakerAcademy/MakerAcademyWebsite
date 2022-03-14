import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import okaidia from "react-syntax-highlighter/dist/cjs/styles/prism/okaidia";
import RoundedButton from "@components/buttons/RoundedButton";
import { TRUST_LEVELS } from "@constants";

const CustomCard = ({ title, description, children }) => (
  <Card sx={{ width: "100%", height: "100%" }} elevation={2}>
    <CardContent>
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ textAlign: "center" }}
      >
        <Typography variant="h6">{title}</Typography>

        <Typography>{description}</Typography>

        <Box sx={{ pt: 1, width: "100%" }}>{children}</Box>
      </Stack>
    </CardContent>
  </Card>
);

const Admin = ({ user }) => {
  const userString = JSON.stringify(user)
    .replaceAll(",", ",\n")
    .replaceAll(":", ": ")
    .slice(1, -1);

  const handleTrustLevelChange = async (e) => {
    const val = e.target.value;

    const res = await fetch(`/api/users?updateProfile=true&&_id=${user?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        trustLevel: val,
      }),
    }).then((response) => {
      if (response.ok) console.log("Updated");
    });
  };

  const generateNewPassword = () => {
    console.log("Generate new password");
  };

  return (
    <div>
      <Box sx={{ mb: 5 }}>
        <SyntaxHighlighter
          language="javascript"
          style={okaidia}
          lineProps={{
            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
          }}
          wrapLines={true}
          showLineNumbers={true}
        >
          {userString}
        </SyntaxHighlighter>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CustomCard
            title="Trust Level"
            description={`Change this users trust level from "${
              TRUST_LEVELS[user.trustLevel]
            }"`}
          >
            <Select
              size="small"
              labelId="trust-level-id"
              defaultValue={user?.trustLevel}
              onChange={handleTrustLevelChange}
              fullWidth
              sx={{ maxWidth: 150 }}
            >
              {Object.keys(TRUST_LEVELS).map((_key) => (
                <MenuItem key={_key} value={_key}>
                  {TRUST_LEVELS[_key]}
                </MenuItem>
              ))}
            </Select>
          </CustomCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CustomCard
            title="New Password"
            description="Assign a new random password to this user"
          >
            <RoundedButton onClick={generateNewPassword}>
              Generate
            </RoundedButton>
          </CustomCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CustomCard
            title="Disable Account"
            description="Temporarily disable this users account"
          >
            <RoundedButton>Disable</RoundedButton>
          </CustomCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CustomCard
            title="Delete Account"
            description="Permanently delete this users account"
          >
            <RoundedButton>Delete</RoundedButton>
          </CustomCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
