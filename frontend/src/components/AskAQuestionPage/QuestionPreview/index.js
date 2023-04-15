import React from 'react';
import ReactHtmlParser from 'html-react-parser';

import './QuestionPreview.css';

const QuestionPreview = ({ title, details }) => {
    return (
        <div className="container" id="question-preview-container">
            <h2>{'Ask A Question > Preview'}</h2>
            <h3>{title}</h3>
            <div>{ReactHtmlParser(details)}</div>
        </div>
    );
};

export default QuestionPreview;
