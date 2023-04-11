import React from "react";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState } from "react";
import { convertToHTML } from 'draft-convert';
import { useEffect } from "react";
// import DOMPurify from 'dompurify'
import'./editor.css'

const RichEditor = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [convertedContent, setConvertedContent] = useState(null);

    // function createMarkup(html) {
    //     return {
    //       __html: DOMPurify.sanitize(html)
    //     }
    //   }
    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
      }, [editorState]);

    return (<div className='editor'>
        <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        />
          {/* <div
            className="preview"
            dangerouslySetInnerHTML={createMarkup(convertedContent)}>
        </div> */}
    </div>)
}
export default RichEditor