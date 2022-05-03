import { Grid, Paper, Stack, TextField, useTheme } from "@mui/material";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  editorToHtml,
  editorToMarkdown,
  htmlToEditor,
  markdownToEditor,
} from "./helpers";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const FormDraftField = ({
  value = "",
  valueType = "markdown",
  onChange,
  hideEditor,
  hideHtml,
  hideMarkdown,
  direction = "column",
}) => {
  const theme = useTheme();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlValue, setHtmlValue] = useState("");
  const [markdownValue, setMarkdownValue] = useState("");

  useEffect(() => {
    if (value && window) {
      switch (valueType) {
        case "markdown":
          handleMarkdownChange(value);
          break;
        case "html":
          handleHtmlChange(value);
          break;
        default:
          handleDraftChange(value);
          break;
      }
    }
  }, [valueType, global.window]);

  const handleDraftChange = async (_editorState) => {
    if (_editorState) {
      setEditorState(_editorState);
      setHtmlValue(await editorToHtml(_editorState));
      setMarkdownValue(await editorToMarkdown(_editorState));
    }
  };

  const handleHtmlChange = async (val, markdownText) => {
    const _editorState = await htmlToEditor(val);
    setEditorState(_editorState);
    setHtmlValue(val);
    setMarkdownValue(markdownText || (await editorToMarkdown(_editorState)));
  };

  const handleMarkdownChange = async (val) => {
    // Convert markdown to html string, then convert to draft
    const htmlString = await markdownToEditor(val);
    handleHtmlChange(htmlString, val);
  };

  useEffect(() => {
    onChange?.({
      editor: editorState,
      html: htmlValue,
      markdown: markdownValue,
    });
  }, [editorState, htmlValue, markdownValue]);

  return (
    <div style={{ padding: 5 }}>
      <Grid container spacing={3} direction={direction}>
        {!hideEditor && (
          <Grid item xs={12} lg={6}>
            <Paper
              sx={{
                flex: 1.5,
                backgroundColor: "#fff",
                color: "#000",
                "& .rdw-editor-main": { px: 2 },
              }}
            >
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={handleDraftChange}
                // plugins={[imagePlugin]}
              />
            </Paper>
          </Grid>
        )}

        {!hideMarkdown && (
          <Grid item xs={12} lg={6}>
            <TextField
              label="Markdown"
              fullWidth
              multiline
              sx={{
                flex: 1,
                height: "inherit",
                "& textarea": { height: "100% !important" },
              }}
              InputProps={{ sx: { height: "100%" } }}
              value={markdownValue}
              onChange={(e) => handleMarkdownChange(e.target.value)}
            />
          </Grid>
        )}

        {!hideHtml && (
          <Grid item xs={12} lg={6}>
            <TextField
              label="HTML"
              fullWidth
              multiline
              sx={{
                flex: 1,
                height: "inherit",
                "& textarea": { height: "100% !important" },
              }}
              InputProps={{ sx: { height: "100%" } }}
              value={htmlValue}
              onChange={(e) => handleHtmlChange(e.target.value)}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default FormDraftField;
