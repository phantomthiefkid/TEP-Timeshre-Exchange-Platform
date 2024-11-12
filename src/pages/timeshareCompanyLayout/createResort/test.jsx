import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../style/editorStyle.css";  // Đảm bảo file CSS được import đúng

const Test = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    return (
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Text Editor Example</h2>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              inline: { inDropdown: true }, 
              list: { inDFopdown: true }, 
              textAlign: { inDropdown: true },
              link: { inDropdown: true }, 
              history: { inDropdown: true },
            }}
          />
        </div>
      );
};

export default Test;
