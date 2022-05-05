import { Box, Typography, useTheme } from "@mui/material";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import React, { useRef } from "react";
import { Controller } from "react-hook-form";

const FormMarkdown = ({ name, control, sx = {}, label, ...props }) => {
  const theme = useTheme();
  const editor = useRef();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ...field }, fieldState: { error }, formState }) => (
        <Box
          sx={{
            p: 1,
            minHeight: 400,
            [theme.breakpoints.up("xl")]: {
              minHeight: 600,
            },
            "& > div": {
              minHeight: "inherit !important",
            },
            "&.toastui-editor-defaultUI": {
              minHeight: "inherit !important",
            },
            "&.toastui-editor-mode-switch": { display: "none" },
            ...sx,
          }}
          data-color-mode={theme.palette.mode}
        >
          {label && (
            <Typography variant="body2" sx={{ px: 1 }}>
              {label}
            </Typography>
          )}

          <Editor
            // theme={theme.palette.mode}
            previewStyle="vertical"
            initialEditType="markdown"
            {...props}
            {...field}
            initialValue={field?.value}
            onChange={(e, v) => {
              field.onChange(editor?.current?.editorInst?.getMarkdown?.());
            }}
            ref={editor}
          />
          {error && <Typography>{error}</Typography>}
        </Box>
      )}
    />
  );
};

export default FormMarkdown;
