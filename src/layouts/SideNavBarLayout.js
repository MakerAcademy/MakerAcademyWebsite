import LandingFooter from "@components/footers/LandingFooter";
import LandingNavbar from "@components/navbars/LandingNavbar";
import FullPageMiniSidebar from "@components/sidebars/FullPageMiniSidebar";
import { Box, Divider, IconButton, useTheme } from "@mui/material";
import React, { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { CommonContext } from "@context/commonContext";
import { SIDE_NAV_BAR_DRAWER_WIDTH } from "@constants/";

const SideNavBarLayout = (props) => {
  const {
    name = "sideNavBarDrawerOpen",
    SidebarHeader,
    sidebarItems = [],
    intlNames = true,
    intlFile = "common",
  } = props;
  const theme = useTheme();

  const { commonState, handleDrawerToggle } = useContext(CommonContext);
  const open = commonState[name];

  const MenuButton = () => (
    <IconButton onClick={() => handleDrawerToggle(name)}>
      <MenuIcon fontSize="small" sx={{ cursor: "pointer" }} />
    </IconButton>
  );

  return (
    <Box>
      <FullPageMiniSidebar
        name={name}
        RenderHeader={SidebarHeader}
        items={sidebarItems}
        intlNames={intlNames}
        intlFile={intlFile}
      />

      <Box
        sx={{
          height: "100%",
          [theme.breakpoints.up("lg")]: {
            width: open
              ? `calc(100% - ${SIDE_NAV_BAR_DRAWER_WIDTH}px)`
              : "100%",
            ml: open ? `${SIDE_NAV_BAR_DRAWER_WIDTH}px` : 0,
          },
        }}
      >
        <LandingNavbar LeftComponent={MenuButton} />

        {props.children}

        <Divider />

        <LandingFooter />
      </Box>
    </Box>
  );
};

export default SideNavBarLayout;
