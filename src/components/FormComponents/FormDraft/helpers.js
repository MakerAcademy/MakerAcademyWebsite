import { ContentState, convertToRaw, EditorState } from "draft-js";
// const draftToHtml = dynamic(() => import("draftjs-to-html"), {
//   ssr: false,
// });
// const htmlToDraft = dynamic(() => import("html-to-draftjs"), {
//   ssr: false,
// });
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { draftToMarkdown } from "markdown-draft-js";
import { compiler } from "markdown-to-jsx";
import { renderToString } from "react-dom/server";

export const markdownToEditor = async (markdown) => {
  const compiled = await compiler(markdown, {
    wrapper: null,
  });
  const markdownToHtml = await renderToString(compiled);

  return markdownToHtml;
};

export const editorToMarkdown = async (editor) => {
  const raw = await convertToRaw(editor.getCurrentContent());

  return await draftToMarkdown(raw, {
    entityItems: {
      IMAGE: {
        open: function (entity) {
          return "";
        },
        close: function (entity) {
          return `![${entity["data"].alt}](${entity["data"].src})`;
        },
      },
    },
  });
};

export const editorToHtml = async (editor) => {
  return await draftToHtml(convertToRaw(editor.getCurrentContent()));
};

export const htmlToEditor = async (html) => {
  const blocksFromHtml = await htmlToDraft(html);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = await ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const editorState = await EditorState.createWithContent(contentState);

  return editorState;
};
