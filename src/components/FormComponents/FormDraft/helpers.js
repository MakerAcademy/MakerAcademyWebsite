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
      // TODO - Do one for embedded videos (iframe)
      //<iframe width="auto" height="auto" src="https://www.youtube.com/embed/2TV0r94p8OY" frameBorder="0"></iframe>
      // [![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/2TV0r94p8OY/0.jpg)](https://www.youtube.com/watch?v=2TV0r94p8OY)

      /*
      Use this somewhere
      let htmlOptions = { blockRenderers: { 'atomic': (block) => { let key = block.getEntityAt(0); let type = editorState.getCurrentContent().getEntity(key).type; if(type === 'EMBEDDED_LINK') { let url = editorState.getCurrentContent().getEntity(key).getData().src; return '<div><iframe src='+url+' frameborder="0" allow="encrypted-media" allowfullscreen></iframe></div>'; } }, }, };
      */
      EMBEDDED_LINK: {
        open: function (entity) {
          return "";
        },
        close: function (entity) {
          return `[![EMBED](${entity["data"].src})](${entity["data"].src})`;
        },
      },
    },
  });
};

export const editorToHtml = async (editor) => {
  return await draftToHtml(convertToRaw(editor.getCurrentContent()));
};

export const htmlToEditor = async (html) => {
  const _html = html.startsWith("<p") ? html : "<p></p>" + html;

  const blocksFromHtml = await htmlToDraft(_html);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = await ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const editorState = await EditorState.createWithContent(contentState);

  return editorState;
};
