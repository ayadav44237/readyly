import { convertToRaw, EditorState } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import ReactHtmlParser from 'react-html-parser'; 

export default function Index() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [html, setHtml] = useState();

  const onEditorStateChange = function (editorState) {
    setEditorState(editorState);
    // converting the currentContent of editor state to raw format
    const rawContent = convertToRaw(editorState.getCurrentContent());
    // getting the html markup from rawContent using draftJsToHtml library
    const markup = draftToHtml(rawContent);
    // setting the markup to state
    setHtml(markup);
  };

  return (
    <>
      <div style={{ height: "80px", overflow: "auto" }}>
      {
        // Prasing the html string in to html format
        ReactHtmlParser(html)
      }
      </div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        mention={{
          separator: " ",
          trigger: "@",
          suggestions: [
            { text: "APPLE", value: "apple" },
            { text: "BANANA", value: "banana", url: "banana" },
            { text: "CHERRY", value: "cherry", url: "cherry" },
            { text: "DURIAN", value: "durian", url: "durian" },
            { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
            { text: "FIG", value: "fig", url: "fig" },
            { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
            { text: "HONEYDEW", value: "honeydew", url: "honeydew" }
          ]
        }}
      />
    </>
  );
}
