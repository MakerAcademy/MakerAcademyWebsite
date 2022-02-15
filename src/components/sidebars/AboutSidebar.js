import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Divider,
  IconButton,
  ListItemText,
  MenuItem,
  MenuList,
  SwipeableDrawer,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const AboutSidebar = ({ menuItems, page, setPage }) => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (_state = !drawerOpen) => {
    setDrawerOpen(_state);
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [page]);

  return (
    <>
      <IconButton size="small">
        <MenuIcon
          fontSize="small"
          sx={{ cursor: "pointer" }}
          onClick={toggleDrawer}
        />
      </IconButton>

      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <Box sx={{ py: 2 }}>
          <MenuList>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ pl: 2, fontWeight: 600 }}>About Us</Typography>

              <Divider sx={{ mt: 2 }} />
            </Box>

            {menuItems.map((item, i) => {
              const isSelected = item.value === page;

              return (
                <MenuItem
                  key={i}
                  selected={isSelected}
                  onClick={() => setPage(item.value)}
                  sx={{
                    borderLeft:
                      isSelected && `3px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <ListItemText sx={{ py: 1 }}>{item.label}</ListItemText>
                </MenuItem>
              );
            })}
          </MenuList>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default AboutSidebar;
