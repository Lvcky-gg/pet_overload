import React from "react";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState } from "react";
import { convertToHTML } from 'draft-convert';
import { useEffect } from "react";
// import DOMPurify from 'dompurify'
import draftToMarkdown from 'draftjs-to-markdown';
import { convertToRaw } from 'draft-js'
// import RenderMarkup from "./renderMarkup";
import'./editor.css'

//handle submission is meant to be passed down here to tell it how to submit data

const RichEditor = ({handleEditorSubmit}) => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [contentState, setcontentState] = useState(null);
    const hashConfig = {
        trigger: '#',
        separator: ' ',
      }
      const config = {
        blockTypesMapping : {/* mappings */},
        emptyLineBeforeBlock : true
      }
    

    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToMarkdown(contentState, hashConfig, config);

    const markdownParser = (markup) => {
        const toHTML = markup
            .replace(/^###### (.*$)/gim, '<h6>$1</h6>') // h4 tag
            .replace(/^##### (.*$)/gim, '<h5>$1</h5>') // h5 tag
            .replace(/^#### (.*$)/gim, '<h4>$1</h4>') // h4 tag
            .replace(/^### (.*$)/gim, '<h3>$1</h3>') // h3 tag
            .replace(/^## (.*$)/gim, '<h2>$1</h2>') // h2 tag
            .replace(/^# (.*$)/gim, '<h1>$1</h1>') // h1 tag
            .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>') // bold text
            .replace(/\*(.*)\*/gim, '<i>$1</i>'); // italic text
        return toHTML.trim(); // using trim method to remove whitespace
    }


    //HTML STRING CAN BE PASSED TO BACKEND
  const htmlString = markdownParser(markup)
  //THIS IS HOW WE PARSE
  const theObj = {__html:htmlString};
 //THIS IS HOW WE VIEW
//  <div
//  className="preview"
//  dangerouslySetInnerHTML={theObj}
// >

// </div>


    useEffect(() => {
        
        setcontentState(rawContentState);
      }, [editorState]);

    return (<div className='editor'>
        <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        />
          <div
            className="preview"
            dangerouslySetInnerHTML={theObj}
        >

        </div>
        <button className="modalButton" onSubmit={handleEditorSubmit}>Submit</button>
    </div>)
}
export default RichEditor