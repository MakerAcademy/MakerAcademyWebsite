import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
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

const AccountSidebar = ({ setPage, sidebarItems }) => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (_state = !drawerOpen) => {
    setDrawerOpen(_state);
  };

  const router = useRouter();
  const { id, type } = router.query;

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
    const _url = url?.replaceAll(/\{(.+?)\}/g, function (_, _param) {
      return router.query?.[_param] || "";
    });

    if (differentPage) {
      router.push(_url);
    } else {
      setPage(_url);
    }
  };

  const SideMenu = () => (
    <MenuList>
      <Box sx={{ mb: 2 }}>
        <UserCard />

        <Divider sx={{ mt: 2 }} />
      </Box>

      {sidebarItems.map((item, i) => {
        if (item.type === "divider") return <Divider key={i} />;
        if (item.hidden) return null;

        const isSelected = item.value === type;

        return (
          <MenuItem
            key={i}
            selected={isSelected}
            onClick={() => handleClick(item.href, !!item.differentPage)}
            sx={{
              py: 1,
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
