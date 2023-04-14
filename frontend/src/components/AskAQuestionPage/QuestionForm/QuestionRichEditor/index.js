// QuestionRichEditor/index.js
import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

import './QuestionRichEditor.css';

const QuestionRichEditor = ({ details, setDetails }) => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(convertFromHTML(details))
    );

    useEffect(() => {
        if (editorState) {
            const currentContentState = editorState.getCurrentContent();
            const html = draftToHtml(convertToRaw(currentContentState));
            setDetails(html);
        }
    }, [editorState]);

    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            spellCheck={true}
            wrapperClassName="question-editor-wrapper"
            editorClassName="question-editor-editor"
            toolbarClassName="question-editor-toolbar"
        />
    );
};

export default QuestionRichEditor;
