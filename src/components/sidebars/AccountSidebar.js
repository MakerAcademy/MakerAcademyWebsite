import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PersonOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Avatar,
  Box,
  Divider,
  Hidden,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  SwipeableDrawer,
  Typography,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import React, { useState } from "react";

const sidebarItems = [
  {
    name: "Profile",
    value: "profile",
    icon: PersonOutlinedIcon,
    href: "/account/profile",
  },
  {
    name: "Account",
    value: "auth",
    icon: SettingsOutlinedIcon,
    href: "/account/auth",
  },
  { type: "divider" },
  {
    name: "Creator Studio",
    icon: MovieOutlinedIcon,
    rightIcon: OpenInNewIcon,
    href: "/creator-studio",
    differentPage: true,
  },
];

const AccountSidebar = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (_state = !drawerOpen) => {
    setDrawerOpen(_state);
  };

  const router = useRouter();
  const { type } = router.query;

  const UserCard = () => (
    <Stack direction="row" alignItems="center" spacing={2.5} sx={{ px: 2 }}>
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

  const SideMenu = () => (
    <MenuList>
      <Box sx={{ mb: 2 }}>
        <UserCard />

        <Divider sx={{ mt: 2 }} />
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
            {item.rightIcon && <item.rightIcon sx={{ fontSize: 18 }} />}
          </MenuItem>
        );
      })}
    </MenuList>
  );

  return (
    <Box sx={{ minWidth: 12 }}>
      <Hidden mdUp>
        <Box sx={{ position: "fixed", top: "50%", left: 1 }}>
          <DragIndicatorIcon
            fontSize="small"
            sx={{
              color: theme.palette.mode === "dark" ? grey[700] : grey[300],
            }}
          />
        </Box>

        <SwipeableDrawer
          anchor="left"
          open={drawerOpen}
          onClose={() => toggleDrawer(false)}
          onOpen={() => toggleDrawer(true)}
        >
          <Box sx={{ py: 2 }}>
            <SideMenu />
          </Box>
        </SwipeableDrawer>
      </Hidden>

      <Hidden mdDown>
        <Box
          sx={{
            minWidth: 200,
            [theme.breakpoints.up("xl")]: {
              minWidth: 272,
            },
          }}
        >
          <SideMenu />
        </Box>
      </Hidden>
    </Box>
  );
};

export default AccountSidebar;
