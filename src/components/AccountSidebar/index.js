import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import { useRouter } from "next/router";
import Link from "next/link";

const sidebarItems = [
  {
    name: "Profile",
    value: "profile",
    icon: PersonOutlinedIcon,
    href: "/account/profile",
  },
  {
    name: "Account",
    value: "account",
    icon: SettingsOutlinedIcon,
    href: "/account/account",
  },
  { type: "divider" },
  {
    name: "Creator Studio",
    icon: MovieOutlinedIcon,
    href: "/",
    differentPage: true,
  },
];

const AccountSidebar = () => {
  const theme = useTheme();

  const router = useRouter();
  const { type } = router.query;

  const UserCard = () => (
    <Stack direction="row" alignItems="center" spacing={2.5}>
      <Avatar sx={{ width: 48, height: 48 }} />

      <Stack spacing={1}>
        <Typography sx={{ fontWeight: 600 }}>Colby Anderson</Typography>
        <Typography variant="body2">Your personal Account</Typography>
      </Stack>
    </Stack>
  );

  const handleClick = (url, differentPage) => {
    router.push(url, undefined, { shallow: !differentPage });
  };

  return (
    <Box>
      <MenuList>
        <Box sx={{ mb: 4, pl: 2 }}>
          <UserCard />
        </Box>

        {sidebarItems.map((item, i) => {
          if (item.type === "divider") return <Divider key={i} />;

          const isSelected = item.value === type;

          return (
            <MenuItem
              key={i}
              sx={{ py: 1.5 }}
              selected={isSelected}
              onClick={() => handleClick(item.href, !!item.differentPage)}
              sx={{
                borderLeft:
                  isSelected && `3px solid ${theme.palette.primary.main}`,
              }}
            >
              <ListItemIcon>
                <item.icon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </MenuItem>
          );
        })}
      </MenuList>
    </Box>
  );
};

export default AccountSidebar;
