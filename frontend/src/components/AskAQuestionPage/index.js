import React, { useEffect, useState } from 'react';
import QuestionForm from './QuestionForm';
import ButtonGroup from './QuestionForm/ButtonGroup';
import QuestionPreview from './QuestionPreview';

import './AskAQuestionPage.css';

const AskAQuestionPage = () => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('<p></p>');
    const [showPreview, setShowPreview] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Todo
    };

    const handlePreview = () => setShowPreview((prev) => !prev);

    return (
        <div className="ask-question-page-container">
            {showPreview ? (
                <>
                    <QuestionPreview title={title} details={details} />
                </>
            ) : (
                <>
                    <h1>Ask a Question</h1>
                    <QuestionForm
                        handleSubmit={handleSubmit}
                        title={title}
                        setTitle={setTitle}
                        details={details}
                        setDetails={setDetails}
                    />
                </>
            )}
            <ButtonGroup
                onPreview={handlePreview}
                showPreview={showPreview}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default AskAQuestionPage;
