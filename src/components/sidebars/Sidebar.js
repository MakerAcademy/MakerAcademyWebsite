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

const Sidebar = ({ menuItems, page, setPage, title, t }) => {
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
      <IconButton size="small" onClick={toggleDrawer}>
        <MenuIcon fontSize="small" sx={{ cursor: "pointer" }} />
      </IconButton>

      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <Box sx={{ py: 2, minWidth: 220 }}>
          <MenuList>
            {title && (
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ pl: 2, fontWeight: 600 }}>{title}</Typography>

                <Divider sx={{ mt: 2 }} />
              </Box>
            )}

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
                  <ListItemText sx={{ py: 1 }}>
                    {t ? t(item.label) : item.label}
                  </ListItemText>
                </MenuItem>
              );
            })}
          </MenuList>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default Sidebar;
