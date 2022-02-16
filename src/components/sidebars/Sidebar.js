import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const drawerWidth = 240;

const Sidebar = ({ title: _title, intlNames, items = [] }) => {
  const [title, setTitle] = useState(_title);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { asPath, query } = router;

  const { t } = useTranslation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRedirect = (url, shallow, name) => {
    name && setTitle(name);
    url && router.push(url, undefined, { shallow });
  };

  useEffect(() => {
    setTitle(_title || null);
  }, [query.type]);

  useEffect(() => {
    open && setOpen(false);
  }, [asPath]);

  const DrawerHeader = ({ children }) => (
    <Stack alignItems="flex-end" sx={{ p: 2 }}>
      {children}
    </Stack>
  );

  return (
    <>
      <Stack direction="row" alignItems="center">
        <IconButton color="inherit" size="small" onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>
        {title && <Typography variant="h6">{title}</Typography>}
      </Stack>

      {open && (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          //   variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <Divider />

          <List>
            {items.map((item, i) => (
              <React.Fragment key={i}>
                <ListItem
                  button={!!item.link}
                  selected={item.link === asPath}
                  onClick={() =>
                    handleRedirect(item.link, item.shallow, item.name)
                  }
                  sx={{
                    borderLeft:
                      item.link === asPath &&
                      `3px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <ListItemText
                    primary={intlNames ? t(item.name) : item.name}
                  />
                </ListItem>

                {item.nestedItems?.map((subItem, j) => (
                  <ListItem
                    button={!!subItem.link}
                    key={`${i}${j}`}
                    selected={subItem.link === asPath}
                    onClick={() =>
                      handleRedirect(
                        subItem.link,
                        subItem.shallow,
                        subItem.name
                      )
                    }
                    sx={{
                      borderLeft:
                        subItem.link === asPath &&
                        `3px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    <ListItemText
                      primary={intlNames ? t(subItem.name) : subItem.name}
                      sx={{ pl: { xs: 1.5, md: 2.5 } }}
                    />
                  </ListItem>
                ))}
              </React.Fragment>
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
