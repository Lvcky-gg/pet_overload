import React from "react";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState } from "react";

const RichEditor = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    return (<div>
        <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        />
    </div>)
}
export default RichEditor