import {
  Box,
  Hidden,
  Link,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";
import { default as ReactScrollSpy } from "react-scrollspy";

const ScrollSpy = ({ title, data }) => {
  const [currentId, setCurrentId] = useState(null);

  const theme = useTheme();
  const { asPath } = useRouter();

  const slugs = data?.map((item) => item.slugs);

  useLayoutEffect(() => {
    const _currentId = asPath.split("#")[1] || slugs[0];
    setCurrentId(_currentId);
  }, []);

  return (
    <Box
      sx={{
        minWidth: 10,
        "& ul": { paddingLeft: 0 },
        [theme.breakpoints.up("md")]: {
          minWidth: 200,
        },
        // [theme.breakpoints.up("xl")]: {
        //   minWidth: 272,
        // },
      }}
    >
      <Box sx={{ position: "fixed" }}>
        <Hidden mdDown>
          {title && (
            <Typography variant="h5" sx={{ mb: 3 }}>
              {title}
            </Typography>
          )}
        </Hidden>

        <ReactScrollSpy
          items={[...(slugs || [])]}
          currentClassName="is-actives"
        >
          {data?.map((item, i) => {
            const isCurrent = currentId === item.slug;

            return (
              <Link
                href={`#${item.slug}`}
                color="inherit"
                underline="none"
                key={i}
                onClick={() => setCurrentId(item.slug)}
              >
                <ListItem
                  button
                  sx={{
                    py: 1.5,
                    borderLeft:
                      isCurrent && `3px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      color: isCurrent
                        ? theme.palette.text.main
                        : theme.palette.text.disabled,
                    }}
                  >
                    <Typography>{i + 1}</Typography>

                    <Hidden mdDown>
                      <Typography>{item.title}</Typography>
                    </Hidden>
                  </Stack>
                </ListItem>
              </Link>
            );
          })}
        </ReactScrollSpy>
      </Box>
    </Box>
  );
};

export default ScrollSpy;
