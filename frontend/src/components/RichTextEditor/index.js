import React from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useState } from 'react';
import { useEffect } from 'react';
import draftToMarkdown from 'draftjs-to-markdown';
import { convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Editor.css';

const RichEditor = ({
    handleEditorSubmit,
    details,
    questionId,
    answerId,
    richTextEditor,
    setRichTextEditor,
}) => {
    const [contentState, setcontentState] = useState(details);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    useEffect(() => {
        if (details) {
            const blocksFromHtml = htmlToDraft(details);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const pushIn = ContentState.createFromBlockArray(
                contentBlocks,
                entityMap
            );
            setEditorState(EditorState.createWithContent(pushIn));
        } else {
            setEditorState(EditorState.createEmpty());
        }
    }, []);

    const hashConfig = {
        trigger: '#',
        separator: ' ',
    };
    const config = {
        blockTypesMapping: {},
        emptyLineBeforeBlock: true,
    };

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
    };

    //HTML STRING CAN BE PASSED TO BACKEND
    const htmlString = markdownParser(markup);
    //THIS IS HOW WE PARSE

    const submitMe = (e, htmlString, questionId, answerId) => {
        setRichTextEditor(!richTextEditor);

        const result = handleEditorSubmit(e, {
            details: htmlString,
            questionId: questionId,
            answerId: answerId,
        });
        // reset to empty
        setEditorState(EditorState.createEmpty());
        return result;
    };

    useEffect(() => {
        setcontentState(rawContentState);
    }, [editorState]);

    return (
        <div className="editor">
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
            <button
                className="modalButton"
                type="submit"
                onClick={(e) => submitMe(e, htmlString, questionId, answerId)}
            >
                Submit
            </button>
        </div>
    );
};
export default RichEditor;
