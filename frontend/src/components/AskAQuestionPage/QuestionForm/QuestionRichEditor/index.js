// QuestionRichEditor/index.js
import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

import './QuestionRichEditor.css';
import htmlToDraft from 'html-to-draftjs';

const QuestionRichEditor = ({ details, setDetails }) => {
    const [editorState, setEditorState] = useState(() => {
        const { contentBlocks, entityMap } = htmlToDraft(details);

        const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
        );

        return EditorState.createWithContent(contentState);
    });

    useEffect(() => {
        if (editorState) {
            const currentContentState = editorState.getCurrentContent();
            const html = draftToHtml(convertToRaw(currentContentState));
            setDetails(html);
        }
    }, [editorState, setDetails]);

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
