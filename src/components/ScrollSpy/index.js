import {
  Box,
  Hidden,
  Link,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { default as ReactScrollSpy } from "react-scrollspy";

const ScrollSpy = ({ title, data }) => {
  const theme = useTheme();

  const slugs = data?.map((item) => item.slug) || [];

  return (
    <Box
      sx={{
        height: "100%",
        minWidth: 10,
        "& ul": { paddingLeft: 0 },
        [theme.breakpoints.up("md")]: {
          width: 240,
        },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 10,
          width: "inherit",
        }}
      >
        <Hidden mdDown>
          {title && (
            <Typography variant="h5" sx={{ mb: 3 }}>
              {title}
            </Typography>
          )}
        </Hidden>

        <Box
          id="xyz"
          sx={{
            color: theme.palette.text.disabled,
            "& .isCurrent > div": {
              borderLeft: `3px solid ${theme.palette.primary.main}`,
              color: theme.palette.text.default,
            },
            mt: -2,
            maxHeight: "80vh",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            [theme.breakpoints.up("md")]: {
              pb: 5,
            },
          }}
        >
          <ReactScrollSpy items={[...slugs]} currentClassName="isCurrent">
            {data?.map((item, i) => {
              const ml = item.depth;

              return (
                <Link
                  id="abc"
                  href={`#${item.slug}`}
                  color="inherit"
                  underline="none"
                  key={i}
                >
                  <ListItem
                    button
                    sx={{
                      py: 1.5,
                      [theme.breakpoints.up("md")]: {
                        ml,
                      },
                    }}
                  >
                    <Stack direction="row" spacing={1}>
                      <Typography
                        variant={ml ? "body2" : "body1"}
                        sx={{ fontWeight: 500 }}
                      >
                        {item.chapter}
                      </Typography>

                      <Hidden mdDown>
                        <Typography
                          variant={ml ? "body2" : "body1"}
                          sx={{ fontWeight: 500 }}
                        >
                          {item.title}
                        </Typography>
                      </Hidden>
                    </Stack>
                  </ListItem>
                </Link>
              );
            })}
          </ReactScrollSpy>
        </Box>
      </Box>
    </Box>
  );
};

export default ScrollSpy;
