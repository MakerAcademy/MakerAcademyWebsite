import { NAVBAR_HEIGHT_DESKTOP, SIDE_NAV_BAR_DRAWER_WIDTH } from "@constants/";
import { CommonContext } from "@context/commonContext";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const FullPageMiniSidebar = ({
  name,
  intlNames,
  items = [],
  RenderHeader,
  withMenuButton,
  intlFile = "common",
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const { commonState, handleDrawerToggle } = useContext(CommonContext);
  const open = commonState[name];

  const router = useRouter();
  const { asPath } = router;

  const { t } = useTranslation(intlFile);

  const handleRedirect = (url, shallow) => {
    url && router.push(url, undefined, { shallow });
  };

  //   useEffect(() => {
  //     open && handleDrawerToggle(name);
  //   }, [asPath]);

  return (
    <>
      {withMenuButton && (
        <IconButton color="inherit" onClick={() => handleDrawerToggle(name)}>
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        open={open}
        onClose={() => handleDrawerToggle(name)}
        variant={isDesktop ? "persistent" : "temporary"}
        PaperProps={{
          sx: {
            width: SIDE_NAV_BAR_DRAWER_WIDTH,
            bgcolor: "background.default",
          },
        }}
      >
        {/* Header */}
        {RenderHeader && (
          <>
            <Box sx={{ p: 2, minHeight: NAVBAR_HEIGHT_DESKTOP }}>
              <RenderHeader />
            </Box>

            <Divider />
          </>
        )}

        <List>
          {items.map((item, i) => {
            if (item.type === "divider") {
              return <Divider sx={{ my: 1 }} />;
            }

            return (
              <React.Fragment key={i}>
                <ListItem
                  button={!!item.link && !item.disableButton}
                  selected={item.link === asPath}
                  onClick={() =>
                    !!item.link &&
                    !item.disableButton &&
                    handleRedirect(item.link, item.shallow)
                  }
                  sx={{
                    py: 1.5,
                    borderLeft:
                      item.link === asPath &&
                      `3px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <Stack spacing={1.5} alignItems="center" direction="row">
                    {item.icon && <item.icon sx={{ fontSize: 20 }} />}
                    <Typography>
                      {intlNames ? t(item.name) : item.name}
                    </Typography>
                  </Stack>
                </ListItem>

                {item.nestedItems?.map((subItem, j) => (
                  <ListItem
                    button={!!subItem.link && !subItem.disableButton}
                    key={`${i}${j}`}
                    selected={subItem.link === asPath}
                    onClick={() =>
                      !!subItem.link &&
                      !subItem.disableButton &&
                      handleRedirect(subItem.link, subItem.shallow)
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
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default FullPageMiniSidebar;
