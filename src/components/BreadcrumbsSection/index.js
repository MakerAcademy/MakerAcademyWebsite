import ResponsiveText from "@components/ResponsiveText";
import {
  Box,
  Breadcrumbs,
  Divider,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

const BreadcrumbsSection = ({
  title,
  subtitle,
  MiddleComponent,
  breadcrumbs = [],
  sx = {},
  align = "center",
  withDivider,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ ...sx }}>
      <Stack
        alignItems={align}
        justifyContent="center"
        spacing={2}
        sx={{
          height: "100%",
          textAlign: "center",
        }}
      >
        {title && (
          <ResponsiveText variant="h3" sx={{ fontWeight: 600 }}>
            {title}
          </ResponsiveText>
        )}

        {subtitle && (
          <ResponsiveText variant="h6" sx={{ fontWeight: 300, maxWidth: 900 }}>
            {subtitle}
          </ResponsiveText>
        )}

        {MiddleComponent && MiddleComponent}

        {breadcrumbs.length > 0 && (
          <Breadcrumbs
            sx={{
              color: theme.palette.primary.main,
              pt: 1,
            }}
          >
            {breadcrumbs.map((item, i) => {
              if (item.active) {
                return (
                  <Typography
                    key={i}
                    sx={{ fontSize: 18, color: theme.palette.text.default }}
                  >
                    {item.label}
                  </Typography>
                );
              }

              return (
                <Link
                  key={i}
                  underline="hover"
                  color="inherit"
                  href={item.href}
                >
                  <Typography sx={{ fontSize: 18 }}>{item.label}</Typography>
                </Link>
              );
            })}
          </Breadcrumbs>
        )}
      </Stack>

      {withDivider && <Divider sx={{ mt: 3 }} />}
    </Box>
  );
};

export default BreadcrumbsSection;
